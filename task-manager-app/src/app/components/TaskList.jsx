"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  IconButton,
} from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../theme"

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("../api/tasks")
      const data = await res.json()
      setTasks(data.tasks)
    }
    fetchTasks()
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setNewTask(value)
    setCharCount(value.length)

    if (value.length === 0) {
      setError("Task description cannot be empty")
    } else if (value.length > 200) {
      setError("Task description cannot exceed 200 characters")
    } else {
      setError("")
    }
  }

  const addTask = async () => {
    if (error || newTask.length === 0 || newTask.length > 200) return

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newTask, completed: false }),
    })

    if (res.ok) {
      const createdTask = await res.json()
      setTasks([...tasks, createdTask])
      setNewTask("")
      setCharCount(0)
    }
  }

  const deleteTask = async (id) => {
    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" })
    setTasks(tasks.filter((task) => task._id !== id))
  }

  const toggleTask = async (id) => {
    const res = await fetch(`/api/tasks?id=${id}`, { method: "PUT" })
    if (res.ok) {
      const updatedTask = await res.json()
      setTasks(
        tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      )
    }
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            p: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "secondary.main",
              padding: 3,
              borderRadius: 3,
              boxShadow: 5,
              maxWidth: 600,
              width: "100%",
              minHeight: 500,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: 2,
              }}
            >
              Onboarding Tasks
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                value={newTask}
                onChange={handleInputChange}
                label="New Task"
                fullWidth
                error={!!error}
                helperText={error || `${charCount}/200`}
              />
              <IconButton
                onClick={addTask}
                color="primary"
                disabled={!!error || newTask.length === 0}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 40,
                  },
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                height: 0,
              }}
            >
              <List>
                {tasks.map((task) => (
                  <ListItem
                    key={task._id}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Checkbox
                      checked={task.completed}
                      onChange={() => toggleTask(task._id)}
                    />
                    <Typography
                      sx={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        color: task.completed ? "grey" : "black",
                        flexGrow: 1,
                        mr: 2,
                      }}
                    >
                      {task.description}
                    </Typography>
                    <IconButton onClick={() => deleteTask(task._id)}>
                      <DeleteForeverIcon color="error" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default TaskList
