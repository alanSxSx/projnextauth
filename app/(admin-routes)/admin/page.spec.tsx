import { render, screen } from '@testing-library/react'
import { AdminPage } from './adminPage'

jest.mock('@/app/components/ButtonLogout', () => () => (
  <div data-testid="button-logout">Logout</div>
))

describe('AdminPage', () => {
  it('deve renderizar com Administrador', () => {
    const session = {
      userData: {
        name: 'Alan Barbosa',
        tipo: 'true',
      },
    }

    render(<AdminPage session={session} />)

    expect(screen.getByText(/olá alan barbosa/i)).toBeInTheDocument()
    expect(screen.getByText(/você é um administrador/i)).toBeInTheDocument()
    expect(screen.getByTestId('button-logout')).toBeInTheDocument()
  })

  it('deve renderizar como usuário comum', () => {
    const session = {
      userData: {
        name: 'João da Silva',
        tipo: 'false',
      },
    }

    render(<AdminPage session={session} />)

    expect(screen.getByText(/olá joão da silva/i)).toBeInTheDocument()
    expect(screen.getByText(/você é um usuário/i)).toBeInTheDocument()
  })

  it('deve lidar com ausência de sessão', () => {
    render(<AdminPage session={null} />)

    expect(screen.getByText(/olá/i)).toHaveTextContent('Olá , bem vindo !')
    expect(screen.getByText(/você é um/i)).toHaveTextContent('Você é um Usuário, bem vindo !')
  })
})
