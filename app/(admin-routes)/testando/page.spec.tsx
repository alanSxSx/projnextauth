import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Testando from '../testando/page';
import { getServerSession } from 'next-auth';

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('@/app/components/ButtonLogout', () => () => (
  <div data-testid="button-logout">Logout</div>
))

describe('Página Testando', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar a mensagem de boas-vindas como Administrador', async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      userData: {
        name: 'Alan',
        tipo: 'true',
      },
    });

    render(await Testando());

    expect(await screen.findByText(/olá alan, bem vindo/i)).toBeInTheDocument();
    expect(screen.getByText(/você está na página de Testes e você é um Administrador/i)).toBeInTheDocument();
  });

  it('deve renderizar a mensagem de boas-vindas como Usuário', async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      userData: {
        name: 'Maria',
        tipo: 'false',
      },
    });

    render(await Testando());

    expect(await screen.findByText(/olá maria, bem vindo/i)).toBeInTheDocument();
    expect(screen.getByText(/você está na página de Testes e você é um Usuário/i)).toBeInTheDocument();
  });

  it('deve lidar com sessão nula corretamente (usuário não autenticado)', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);

    render(await Testando());

    expect(await screen.findByText(/olá/i)).toBeInTheDocument();
    expect(screen.getByText(/você está na página de Testes e você é um Usuário/i)).toBeInTheDocument();
  });
});
