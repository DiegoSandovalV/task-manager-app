import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./styles/bg.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A simple task manager",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
