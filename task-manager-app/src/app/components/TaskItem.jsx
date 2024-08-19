"use client"

import { Checkbox, IconButton, ListItem, Typography } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { deleteTaskAction, toggleTaskAction } from "../libs/actions"

export default function TaskItem({ task, hydrate }) {
  const toggleTask = async (id) => {
    hydrate({
      ...task,
      completed: !task.completed,
    })
    await toggleTaskAction(id)
  }

  const deleteTask = async (id) => {
    hydrate(null)
    await deleteTaskAction(task._id)
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
