// app/components/UserFormModal.js

'use client'
import { useState, useEffect } from 'react'
import Modal from './Modal'

export default function UserFormModal({ isOpen, onClose, onSuccess, editUser }) {
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
    setError('') // Limpiar errores al abrir
  }, [editUser, isOpen])

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

      // Limpiar formulario, cerrar modal y notificar éxito
      setFormData({ name: '', email: '' })
      onClose()
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

  const handleClose = () => {
    if (!loading) {
      setFormData({ name: '', email: '' })
      setError('')
      onClose()
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title={editUser ? '✏️ Editar Usuario' : '➕ Crear Usuario'}
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="Ingresa el nombre"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="usuario@ejemplo.com"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex-1 py-2 px-4 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-2 px-4 rounded-lg font-medium text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : editUser
                ? 'bg-orange-500 hover:bg-orange-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading 
              ? '⏳ Guardando...' 
              : editUser 
              ? '💾 Actualizar' 
              : '✨ Crear'
            }
          </button>
        </div>
      </form>
    </Modal>
  )
}