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
import { ThemeProvider } from "@mui/material/styles"
import theme from "../theme"
import TaskItem from "./TaskItem"

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [error, setError] = useState("")

  const fetchTasks = async () => {
    const res = await fetch("../api/tasks")
    const data = await res.json()
    setTasks(data.tasks)
  }

  fetchTasks()

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
                  marginBottom: 3,
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
                  <TaskItem key={task._id} task={task} />
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
