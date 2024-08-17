import connectMongoDB from "../../libs/mongodb"
import Task from "../../models/task"
import { NextResponse } from "next/server"

export async function POST(req, res) {
  try {
    await connectMongoDB()
    const body = await req.json()
    const task = new Task(body)
    const savedTask = await task.save()
    return NextResponse.json(savedTask, { status: 201 })
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

export async function DELETE(req, res) {
  try {
    const id = req.nextUrl.searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      )
    }

    await connectMongoDB()
    await Task.findByIdAndDelete(id)
    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting task", error },
      { status: 500 }
    )
  }
}

export async function PUT(req) {
  try {
    await connectMongoDB()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      )
    }

    const task = await Task.findById(id)

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 })
    }

    task.completed = !task.completed
    await task.save()

    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json(
      { message: "Error toggling task", error },
      { status: 500 }
    )
  }
}
