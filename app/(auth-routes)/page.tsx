'use client'

import { signIn } from 'next-auth/react';
import { useRef, useState } from 'react';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { InputMask } from 'primereact/inputmask';
import { useRouter } from 'next/navigation'

import PulseLoader from "react-spinners/PulseLoader";


export default function Home() {


	const [isButtonDisabled, setIsButtonDisabled] = useState(false)
	const toast = useRef<Toast | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();



	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		setLoading(true);
		setIsButtonDisabled(true);

		const result = await signIn('credentials', {
			cpf: data.cpf,
			senha: data.senha,
			redirect: false,
		})

		if (result?.error) {
			console.log(result)
			console.log("Deu errado")
			setTimeout(() => {
				toast.current?.show({
					severity: "error",
					summary: "Error",
					detail: "CPF ou Senha Inválidos",
					life: 5000,
				});
			}, 600);
			setIsButtonDisabled(false);
			setLoading(false);
			return
		}
		//MEXER NESSA LÓGICA PRA REDIRECIONAR MELHOR QUANDO O USUARIO ENTRAR
		router.refresh();
		
	}


	interface IFormInput {
		cpf: number | string;
		senha: string;
	}

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>();


	const getFormErrorMessage = (name: keyof IFormInput) => {
		const error = errors[name as keyof IFormInput];

		if (error) {
			return <small className="p-error">{error.message}</small>;
		} else {
			return <small className="p-error">&nbsp;</small>;
		}
	};

	return (
		<>
			<Toast ref={toast} />

			<div className='flex flex-column align-items-center h-screen'>
				{loading ? (
        <div className='flex flex-column justify-content-center align-items-center h-screen'>
			 <PulseLoader color="#d63636" size={15} aria-label = "Carregando Spinner" margin={2} loading={loading} />
        </div>
      ) : (		<><h1 className='text-3xl mb-2'>Login</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2 w-6">
					<Controller
						name="cpf"
						control={control}
						rules={{ required: 'CPF is required.' }}
						render={({ field, fieldState }) => (
							<>
								<label htmlFor={field.name} className={classNames({ 'p-error': errors.cpf })}></label>
								<span className="p-float-label">
									<InputMask id={field.name} value={field.value !== undefined ? String(field.value) : ''} mask="99999999999" className={`flex flex-column w-12 ${classNames({ 'p-invalid': fieldState.error })}`} onChange={(e) => field.onChange(e.target.value)} />
									<label htmlFor={field.name}>CPF</label>
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
									<Password id={field.name} value={field.value ? field.value : ''} className={`flex flex-column w-12 ${classNames({ 'p-invalid': fieldState.error })}`} toggleMask onChange={(e) => field.onChange(e.target.value)} feedback={false} />
									<label htmlFor={field.name}>Password</label>
								</span>
								{getFormErrorMessage('senha')}
							</>
						)}
					/>
					<Button label="Entrar" type="submit" icon="pi pi-check" disabled={isButtonDisabled} />
				</form>
				</>)}
			</div>

		</>
	)
}
