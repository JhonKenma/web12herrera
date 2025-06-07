// app/page.js

import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenido a Mi CRUD App
        </h1>
        <p className="text-xl text-gray-600">
          Aplicación completa con Next.js, Prisma y PostgreSQL
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">👥 Usuarios</h2>
          <p className="text-gray-600 mb-4">
            Gestiona los usuarios de la aplicación. Puedes crear, editar, eliminar y ver todos los usuarios registrados.
          </p>
          <Link 
            href="/users"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block hover:bg-blue-600 transition"
          >
            Ver Usuarios
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-600">📝 Posts</h2>
          <p className="text-gray-600 mb-4">
            Administra los posts del blog. Cada post está asociado a un usuario y puedes realizar todas las operaciones CRUD.
          </p>
          <Link 
            href="/posts"
            className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block hover:bg-green-600 transition"
          >
            Ver Posts
          </Link>
        </div>
      </div>

      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">🚀 Características</h2>
        <ul className="space-y-2 text-gray-600">
          <li>✅ CRUD completo para Usuarios y Posts</li>
          <li>✅ Relaciones entre tablas (Usuario → Posts)</li>
          <li>✅ API REST con Next.js</li>
          <li>✅ Base de datos PostgreSQL con Prisma ORM</li>
          <li>✅ Interfaz intuitiva y responsive</li>
          <li>✅ Navegación fácil entre secciones</li>
        </ul>
      </div>
    </div>
  )
}