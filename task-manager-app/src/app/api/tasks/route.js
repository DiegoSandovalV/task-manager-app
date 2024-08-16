import connectMongoDB from "../../libs/mongodb"
import Task from "../../models/task"
import { NextResponse } from "next/server"

export async function POST(req, res) {
  try {
    await connectMongoDB()
    const body = await req.json()
    const task = new Task(body)
    await task.save()
    return NextResponse.json(
      { message: "Task created successfully" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating task", error },
      { status: 500 }
    )
  }
}

export async function GET(req, res) {
  try {
    await connectMongoDB()
    const tasks = await Task.find({})
    return NextResponse.json({ tasks })
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching tasks", error },
      { status: 500 }
    )
  }
}
