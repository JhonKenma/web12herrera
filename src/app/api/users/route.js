// app/api/users/route.js
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET - Obtener todos los usuarios
export async function GET() { 
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener usuarios' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo usuario
export async function POST(request) {
  try {
    const { name, email } = await request.json()
    
    const user = await prisma.user.create({
      data: {
        name,
        email
      }
    })
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email ya existe' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar usuario
export async function PUT(request) {
  try {
    const { id, name, email } = await request.json()
    
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email
      }
    })
    
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar usuario' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar usuario
export async function DELETE(request) {
  try {
    const { id } = await request.json()
    
    await prisma.user.delete({
      where: { id: parseInt(id) }
    })
    
    return NextResponse.json({ message: 'Usuario eliminado' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar usuario' },
      { status: 500 }
    )
  }
}