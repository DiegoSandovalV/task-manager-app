"use client"

import { Checkbox, IconButton, ListItem, Typography } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { useRouter } from "next/navigation"

export default function TaskItem({ task }) {
  const router = useRouter()
  const deleteTask = async (id) => {
    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" })
    router.refresh()
  }

  const toggleTask = async (id) => {
    const res = await fetch(`/api/tasks?id=${id}`, { method: "PUT" })
    if (res.ok) {
      const updatedTask = await res.json()
      router.refresh()
    }
  }

  return (
    <ListItem key={task._id} sx={{ display: "flex", alignItems: "center" }}>
      <Checkbox
        checked={task.completed}
        onChange={() => toggleTask(task._id)}
      />
      <Typography
        sx={{
          textDecoration: task.completed ? "line-through" : "none",
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
  )
}
