"use client"

import { Button, TextField, Box, IconButton } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { addTaskAction } from "@/app/libs/actions"

export default function TaskForm() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [error, setError] = useState("")

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

  return (
    <form action={addTaskAction}>
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
          name="description"
        />
        <IconButton
          type="submit"
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
    </form>
  )
}
