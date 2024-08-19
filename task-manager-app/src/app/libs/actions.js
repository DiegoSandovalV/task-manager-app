"use server"

import Task from "@/app/models/task"

export async function addTaskAction(formData) {
  "use server"

  const description = formData.get("description")

  const res = await fetch(
    "https://task-manager-app-puce.vercel.app/api/tasks",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: description, completed: false }),
    }
  )

  if (res.ok) {
    return await res.json()
  }
}

export async function deleteTaskAction(id) {
  "use server"

  const res = await fetch(
    `https://task-manager-app-puce.vercel.app/api/tasks?id=${id}`,
    { method: "DELETE" }
  )
}

export async function toggleTaskAction(id) {
  "use server"

  const res = await fetch(
    `https://task-manager-app-puce.vercel.app/api/tasks?id=${id}`,
    { method: "PUT" }
  )
}
