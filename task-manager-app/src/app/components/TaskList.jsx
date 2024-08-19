import { Box, Typography, List } from "@mui/material"
import TaskItem from "./TaskItem"
import TaskForm from "./TaskForm"

async function fetchTasks() {
  const res = await fetch("https://task-manager-app-puce.vercel.app/api/tasks")
  const tasks = await res.json()
  return tasks.tasks
}

const TaskList = async () => {
  const tasks = await fetchTasks()
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
          <TaskForm />

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
    </div>
  )
}

export default TaskList
