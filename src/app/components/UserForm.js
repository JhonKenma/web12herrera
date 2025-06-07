// app/components/UserForm.js

'use client'
import { useState, useEffect } from 'react'

export default function UserForm({ onSuccess, editUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Llenar formulario cuando se está editando
  useEffect(() => {
    if (editUser) {
      setFormData({
        name: editUser.name,
        email: editUser.email
      })
    } else {
      setFormData({ name: '', email: '' })
    }
  }, [editUser])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const method = editUser ? 'PUT' : 'POST'
      const body = editUser 
        ? { ...formData, id: editUser.id }
        : formData

      const response = await fetch('/api/users', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar solicitud')
      }

      // Limpiar formulario y notificar éxito
      setFormData({ name: '', email: '' })
      onSuccess()
      
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editUser ? '✏️ Editar Usuario' : '➕ Crear Usuario'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ingresa el nombre"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="usuario@ejemplo.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : editUser
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {loading 
            ? '⏳ Procesando...' 
            : editUser 
            ? '💾 Actualizar Usuario' 
            : '✨ Crear Usuario'
          }
        </button>
      </form>
    </div>
  )
}