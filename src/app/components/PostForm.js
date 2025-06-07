// app/components/PostForm.js

'use client'
import { useState, useEffect } from 'react'

export default function PostForm({ onSuccess, editPost }) {
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
    fetchUsers()
  }, [])

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
  }, [editPost])

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

      // Limpiar formulario y notificar éxito
      setFormData({ title: '', content: '', userId: '' })
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
        {editPost ? '✏️ Editar Post' : '➕ Crear Post'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ingresa el título del post"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Contenido
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
            placeholder="Escribe el contenido del post..."
          />
        </div>

        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            Autor
          </label>
          <select
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecciona un autor</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : editPost
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {loading 
            ? '⏳ Procesando...' 
            : editPost 
            ? '💾 Actualizar Post' 
            : '✨ Crear Post'
          }
        </button>
      </form>
    </div>
  )
}