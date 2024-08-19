"use client"
import { Box, Typography, List } from "@mui/material"
import TaskItem from "./TaskItem"
import TaskForm from "./TaskForm"
import { useEffect, useState, useRef, Fragment } from "react"

async function fetchTasks() {
  const res = await fetch("https://task-manager-app-puce.vercel.app/api/tasks")
  const tasks = await res.json()
  return tasks.tasks
}

export default function TaskList() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks().then((tasks) => {
      setTasks(tasks)
    })
  }, [])

  const hydrate = (newTask, idx) => {
    if (newTask === null) {
      setTasks((tasks) => [
        ...tasks.slice(0, idx),
        ...tasks.slice(idx + 1, tasks.length),
      ])
      return
    }
    setTasks((tasks) => [
      ...tasks.slice(0, idx),
      newTask,
      ...tasks.slice(idx + 1, tasks.length),
    ])
  }

  return (
    <div>
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
          <TaskForm
            hydrate={(newTask) => {
              hydrate(newTask, tasks.length)
            }}
          />

          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              height: 0,
            }}
          >
            <List>
              {tasks.map((task, i) => (
                <Fragment key={i}>
                  <TaskItem
                    task={task}
                    hydrate={(newTask) => {
                      hydrate(newTask, i)
                    }}
                  />
                </Fragment>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
