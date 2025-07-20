 'use client'
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function ButtonLogout() {
  const router = useRouter();

  // async function logout() {
  //   await signOut({
  //     redirect: true,
	// 		callbackUrl: '/',

  //   });

  //   // router.replace('/');
  // }

	const logout = async () => {
    await signOut({ redirect: false });
    router.replace('/');
  };

  return (
    <div className='flex justify-content-center align-items-center'>
      <button className="p-2 w-6 border border-gray-300 rounded-md" onClick={logout}>
        Sair
      </button>
    </div>
  );
}
