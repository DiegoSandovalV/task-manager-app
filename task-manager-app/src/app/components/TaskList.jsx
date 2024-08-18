"use client"

import { useEffect, useState } from "react"
import {
  Button,
  List,
  ListItem,
  Checkbox,
  Typography,
  IconButton,
  TextField,
  Box,
} from "@mui/material"
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
          }}
        >
          <Box
            sx={{
              backgroundColor: "secondary.main",
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              maxWidth: 600,
              width: "100%",
            }}
          >
            <Typography variant="h4">Task List</Typography>
            <TextField
              value={newTask}
              onChange={handleInputChange}
              label="New Task"
              fullWidth
              error={!!error}
              helperText={error || `${charCount}/200`}
            />
            <Button
              onClick={addTask}
              variant="contained"
              color="primary"
              disabled={!!error || newTask.length === 0}
            >
              Add Task
            </Button>
            <List>
              {tasks.map((task) => (
                <ListItem key={task._id}>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTask(task._id)}
                  />
                  <Typography
                    sx={{
                      textDecoration: task.completed ? "line-through" : "none",
                      flexGrow: 1,
                      mr: 2,
                    }}
                  >
                    {task.description}
                  </Typography>
                  <IconButton onClick={() => deleteTask(task._id)}>
                    <span role="img" aria-label="delete">
                      ❌
                    </span>
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default TaskList
