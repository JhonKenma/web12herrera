// app/posts/page.js

'use client'
import { useState, useEffect } from 'react'
import PostFormModal from '../components/PostFormModal'
import PostList from '../components/PostList'

export default function PostsPage() {
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error al cargar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSuccess = () => {
    fetchPosts()
    setEditingPost(null)
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setEditingPost(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingPost(null)
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-gray-600">Cargando posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📝 Gestión de Posts</h1>
        
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2 shadow-lg"
        >
          <span>➕</span>
          <span>Nuevo Post</span>
        </button>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{posts.length}</h2>
            <p className="text-green-100">Posts publicados</p>
          </div>
          <div className="text-4xl opacity-20">📝</div>
        </div>
      </div>
      
      {/* Lista de posts */}
      <PostList 
        posts={posts}
        onDelete={handleSuccess}
        onEdit={handleEdit}
      />

      {/* Modal */}
      <PostFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        editPost={editingPost}
      />
    </div>
  )
}