// app/components/PostFormModal.js

'use client'
import { useState, useEffect } from 'react'
import Modal from './Modal'

export default function PostFormModal({ isOpen, onClose, onSuccess, editPost }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    userId: ''
  })
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Cargar usuarios para el select
  useEffect(() => {
    if (isOpen) {
      fetchUsers()
    }
  }, [isOpen])

  // Llenar formulario cuando se está editando
  useEffect(() => {
    if (editPost) {
      setFormData({
        title: editPost.title,
        content: editPost.content,
        userId: editPost.userId.toString()
      })
    } else {
      setFormData({ title: '', content: '', userId: '' })
    }
    setError('') // Limpiar errores al abrir
  }, [editPost, isOpen])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const method = editPost ? 'PUT' : 'POST'
      const body = editPost 
        ? { ...formData, id: editPost.id }
        : formData

      const response = await fetch('/api/posts', {
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
      setFormData({ title: '', content: '', userId: '' })
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
      setFormData({ title: '', content: '', userId: '' })
      setError('')
      onClose()
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title={editPost ? '✏️ Editar Post' : '➕ Crear Post'}
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="Ingresa el título del post"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Contenido *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            disabled={loading}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical disabled:bg-gray-100"
            placeholder="Escribe el contenido del post..."
          />
        </div>

        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
            Autor *
          </label>
          <select
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">Selecciona un autor</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
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
                : editPost
                ? 'bg-orange-500 hover:bg-orange-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {loading 
              ? '⏳ Guardando...' 
              : editPost 
              ? '💾 Actualizar' 
              : '✨ Crear'
            }
          </button>
        </div>
      </form>
    </Modal>
  )
}