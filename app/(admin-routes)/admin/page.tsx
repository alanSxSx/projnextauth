import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../../lib/authOptions'
import { AdminPage } from './adminPage'

export default async function Admin() {
  const session = await getServerSession(nextAuthOptions)
  return <AdminPage session={session} />
}
