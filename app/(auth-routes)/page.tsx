'use client'

import { getSession, signIn } from 'next-auth/react';
import { useRef, useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { useRouter } from 'next/navigation';
import PulseLoader from "react-spinners/PulseLoader";
import { InputText } from 'primereact/inputtext';

interface IFormInput {
	email: number | string;
	senha: string;
}

export default function Home() {
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const toast = useRef<Toast | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [session, setSession] = useState(null);

	useEffect(() => {
		const fetchSession = async () => {
			const sess = await getSession();
			setSession(session);
		};

		fetchSession();
	}, []);

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		setLoading(true);
		setIsButtonDisabled(true);

		const result = await signIn('credentials', {
			email: data.email,
			senha: data.senha,
			redirect: false,
		});

		if (result?.error) {
			setTimeout(() => {
				toast.current?.show({
					severity: "error",
					summary: "Erro",
					detail: "Email ou Senha inválidos",
					life: 5000,
				});
			}, 600);
			setIsButtonDisabled(false);
			setLoading(false);
			return;
		}

		// Aguarda atualizar a sessão
		const newSession = await getSession();
		if (newSession?.userData?.tipo === "true") {
			router.push('/admin');
		} else if (newSession?.userData?.tipo === "false") {
			router.push('/testandouser');
		}
	};

	const getFormErrorMessage = (name: keyof IFormInput) => {
		const error = errors[name];
		return error ? <small className="p-error">{error.message}</small> : <small className="p-error">&nbsp;</small>;
	};

	return (
		<>
			<Toast ref={toast} />
			<div className='flex flex-column align-items-center justify-content-center h-screen'>
				{loading ? (
					<div className='flex flex-column justify-content-center align-items-center h-screen'>
						<PulseLoader color="#d63636" size={15} aria-label="Carregando Spinner" margin={2} loading={loading} />
					</div>
				) : (
					<>
						<h1 className='text-3xl mb-2'>Login</h1>
						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2 w-4">
							<Controller
								name="email"
								control={control}
								rules={{ required: 'Email is required.' }}
								render={({ field, fieldState }) => (
									<>
										<label htmlFor={field.name} className={classNames({ 'p-error': errors.email })}></label>
										<span className="p-float-label">
											<InputText data-testid="email" name={field.name} id={field.name} value={String(field.value ?? '')} className={`flex flex-column w-12 ${classNames({ 'p-invalid': fieldState.error })}`} onChange={(e) => field.onChange(e.target.value)} />
											<label htmlFor={field.name}>Email</label>
										</span>
										{getFormErrorMessage(field.name)}
									</>
								)}
							/>
							<Controller
								name="senha"
								control={control}
								rules={{ required: 'Password is required.' }}
								render={({ field, fieldState }) => (
									<>
										<label htmlFor={field.name} className={classNames({ 'p-error': errors.senha })}></label>
										<span className="p-float-label">
											<Password name={field.name} data-testid="senha" id={field.name} value={field.value ?? ''} className={`flex flex-column w-12 ${classNames({ 'p-invalid': fieldState.error })}`} toggleMask onChange={(e) => field.onChange(e.target.value)} feedback={false} />
											<label htmlFor={field.name}>Password</label>
										</span>
										{getFormErrorMessage('senha')}
									</>
								)}
							/>
							<Button label="Entrar" type="submit" icon="pi pi-check" disabled={isButtonDisabled} />
						</form>
					</>
				)}
			</div>
		</>
	);
}
