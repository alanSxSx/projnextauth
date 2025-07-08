import React from 'react'
import {getServerSession} from 'next-auth'
import { nextAuthOptions } from '../../lib/authOptions'
import ButtonLogout from '@/app/components/ButtonLogout'




export default async function TestandoUser() {

	const session = await getServerSession(nextAuthOptions)


	return (
		<div className='w-full h-screen flex flex-column items-center justify-center'>
			<h1 className='text-2xl mb-8 flex justify-content-center align-items-center'>Olá {session?.userData.name}, bem vindo !</h1>
			<h1 className='text-2xl mb-8 flex justify-content-center align-items-center'> Você está na página de Testes e você é um {session?.userData.tipo =="true" ? "Administrador" : "Usuário"}</h1>
			<ButtonLogout/>
		</div>
	)
}
