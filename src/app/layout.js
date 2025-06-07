// app/layout.js

import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Mi CRUD App',
  description: 'Aplicación CRUD con Next.js y Prisma',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  )
}