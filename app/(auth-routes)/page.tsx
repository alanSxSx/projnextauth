'use client'

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react';


export default function Home() {

	const [cpf,setCpf] = useState<string>('');
	const [senha,setSenha] = useState<string>('');
	const router = useRouter();

	async function handleSubmit(e:SyntheticEvent){
	e.preventDefault();

		const result = await signIn('credentials',{
			cpf,
			senha,
			redirect:false
		})

		if (result?.error) {
			console.log(result)
			return
		}
		router.replace('/admin')
	}

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
			<h1 className='text-3xl mb-6'>Login</h1>
			<form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
				<input
				className='h-12 rounded-md p-2 bg-transparent border border-gray-300'
				type='text'
				name='cpf'
				placeholder='Digite seu CPF'
				onChange={(e) => setCpf(e.target.value)}
				/>
				<input
				className='h-12 rounded-md p-2 bg-transparent border border-gray-300'
				type='password'
				name='password'
				placeholder='Digite sua Senha'
				onChange={(e) => setSenha(e.target.value)}
				/>
				<button
				className="h-12 rounded-md bg-gray-300 text-gray-800 houver:bg-gray-400"
				type='submit'
				>Entrar</button>

			</form>


		</div>
  )
}
