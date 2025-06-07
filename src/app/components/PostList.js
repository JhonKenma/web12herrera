// app/components/PostList.js

'use client'
import { useState } from 'react'

export default function PostList({ posts, onDelete, onEdit }) {
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) {
      return
    }

    setDeletingId(id)
    
    try {
      const response = await fetch('/api/posts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      })

      if (response.ok) {
        onDelete()
      } else {
        const data = await response.json()
        alert(data.error || 'Error al eliminar post')
      }
    } catch (error) {
      alert('Error al eliminar post')
    } finally {
      setDeletingId(null)
    }
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay posts</h3>
        <p className="text-gray-500">Crea tu primer post usando el formulario de arriba</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-bold text-gray-800">
          📋 Lista de Posts ({posts.length})
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {posts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 mr-3">
                    {post.title}
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    ID: {post.id}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3 line-clamp-3">
                  {post.content}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span className="flex items-center">
                    👤 <span className="ml-1 font-medium">{post.user?.name || 'Usuario desconocido'}</span>
                  </span>
                  <span>
                    📅 {new Date(post.createdAt).toLocaleDateString('es-ES')}
                  </span>
                  <span>
                    🕒 {new Date(post.createdAt).toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit(post)}
                  className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition-colors flex items-center space-x-1"
                >
                  <span>✏️</span>
                  <span>Editar</span>
                </button>
                
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deletingId === post.id}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-1 ${
                    deletingId === post.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  <span>{deletingId === post.id ? '⏳' : '🗑️'}</span>
                  <span>{deletingId === post.id ? 'Eliminando...' : 'Eliminar'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}