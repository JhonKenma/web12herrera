// app/users/page.js

'use client'
import { useState, useEffect } from 'react'
import UserFormModal from '../components/UserFormModal'
import UserList from '../components/UserList'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSuccess = () => {
    fetchUsers()
    setEditingUser(null)
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setEditingUser(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">👥 Gestión de Usuarios</h1>
        
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2 shadow-lg"
        >
          <span>➕</span>
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{users.length}</h2>
            <p className="text-blue-100">Usuarios registrados</p>
          </div>
          <div className="text-4xl opacity-20">👥</div>
        </div>
      </div>
      
      {/* Lista de usuarios */}
      <UserList 
        users={users}
        onDelete={handleSuccess}
        onEdit={handleEdit}
      />

      {/* Modal */}
      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        editUser={editingUser}
      />
    </div>
  )
}