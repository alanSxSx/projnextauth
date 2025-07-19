'use client'

import React from 'react'
import ButtonLogout from '@/app/components/ButtonLogout'

interface Props {
  session: {
    userData?: {
      name: string
      tipo: string
    }
  } | null
}

export function AdminPage({ session }: Props) {
  return (
    <div className='w-full h-screen flex flex-column items-center justify-center'>
      <h1 className='text-2xl mb-8'>Olá {session?.userData?.name}, bem vindo !</h1>
      <h1 className='text-2xl mb-8'>
        Você é um {session?.userData?.tipo === 'true' ? 'Administrador' : 'Usuário'}, bem vindo !
      </h1>
      <ButtonLogout />
    </div>
  )
}
