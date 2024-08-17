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
} from "@mui/material"

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks")
      const data = await res.json()
      setTasks(data.tasks)
    }
    fetchTasks()
  }, [])

  const addTask = async () => {
    if (newTask.length === 0 || newTask.length > 200) return
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newTask, completed: false }),
    })
    if (res.ok) {
      setTasks([...tasks, await res.json()])
      setNewTask("")
    }
  }

  const deleteTask = async (id) => {
    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" })
    setTasks(tasks.filter((task) => task._id !== id))
  }

  return (
    <div>
      <Typography variant="h4">Task List</Typography>
      <TextField
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        label="New Task"
        fullWidth
      />
      <Button onClick={addTask} variant="contained" color="primary">
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            <Checkbox checked={task.completed} />
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
    </div>
  )
}

export default TaskList
