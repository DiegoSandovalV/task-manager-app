import Image from "next/image"
import styles from "./page.module.css"
import TaskList from "./components/TaskList"

export default function Home() {
  return (
    <div>
      <TaskList />
    </div>
  )
}
