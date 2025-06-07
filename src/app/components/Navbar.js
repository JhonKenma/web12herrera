'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
// Usando íconos Unicode en lugar de Heroicons

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Inicio', href: '/', icon: '🏠' },
    { name: 'Usuarios', href: '/users', icon: '👥' },
    { name: 'Posts', href: '/posts', icon: '📝' },
  ]

  const isActiveLink = (href) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-lg font-bold">📋</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                CRUD<span className="text-blue-200">Manager</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigation.map((item) => {
                const isActive = isActiveLink(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2
                      ${isActive 
                        ? 'bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/20' 
                        : 'text-blue-100 hover:bg-white/5 hover:text-white hover:shadow-md'
                      }
                    `}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {mobileMenuOpen ? (
                <span className="block text-xl" aria-hidden="true">✕</span>
              ) : (
                <span className="block text-xl" aria-hidden="true">☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-700/50 backdrop-blur-sm border-t border-white/10">
          {navigation.map((item) => {
            const isActive = isActiveLink(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center space-x-3
                  ${isActive 
                    ? 'bg-white/10 text-white shadow-lg border border-white/20' 
                    : 'text-blue-100 hover:bg-white/5 hover:text-white'
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}