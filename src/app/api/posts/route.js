// app/api/posts/route.js

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET - Obtener todos los posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener posts' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo post
export async function POST(request) {
  try {
    const { title, content, userId } = await request.json()
    
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: parseInt(userId)
      },
      include: {
        user: true
      }
    })
    
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear post' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar post
export async function PUT(request) {
  try {
    const { id, title, content } = await request.json()
    
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content
      },
      include: {
        user: true
      }
    })
    
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar post' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar post
export async function DELETE(request) {
  try {
    const { id } = await request.json()
    
    await prisma.post.delete({
      where: { id: parseInt(id) }
    })
    
    return NextResponse.json({ message: 'Post eliminado' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar post' },
      { status: 500 }
    )
  }
}