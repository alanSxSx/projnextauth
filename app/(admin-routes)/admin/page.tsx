import React from 'react'
import {getServerSession} from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import ButtonLogout from '@/app/components/ButtonLogout'




export default async function Admin() {

	const session = await getServerSession(nextAuthOptions)


	return (
		<div className='w-full h-screen flex flex-column items-center justify-center'>
			<h1 className='text-2xl mb-8 flex justify-content-center align-items-center'>Olá {session?.userData.name}, bem vindo !</h1>
			<ButtonLogout/>
		</div>
	)
}
