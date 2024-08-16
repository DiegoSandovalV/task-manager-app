import moongose from "mongoose"

const taskSchema = new moongose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

const Task = moongose.models.Task || moongose.model("Task", taskSchema)

export default Task
