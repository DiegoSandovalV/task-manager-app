"use server"

import Task from "@/app/models/task"
import { revalidatePath } from "next/cache"

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
    revalidatePath("/")
  }
}
