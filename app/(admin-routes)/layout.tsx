import { ReactNode } from 'react';
import {getServerSession} from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

interface PrivatelayoutProps {
	readonly children: ReactNode;
}

export default async function PrivateLayout({children}:PrivatelayoutProps) {
	const session = await getServerSession(nextAuthOptions)

	if (!session) {
			redirect('/')
	}

	return <>{children}</>

}
