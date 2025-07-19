import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Home from './page';
import * as nextNavigation from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';


jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn(),
  };
});

const toastMock = jest.fn();

jest.mock('primereact/toast', () => {
  return {
    Toast: React.forwardRef((_props, ref) => {
      React.useImperativeHandle(ref, () => ({
        show: toastMock,
      }));
      return <div data-testid="mock-toast" />;
    }),
  };
});

jest.mock('next-auth/react', () => ({
  getSession: jest.fn(() => Promise.resolve(null)),
  signIn: jest.fn(),
  useSession: () => ({ data: null, status: 'unauthenticated' }),
}));

describe('Home Login Page', () => {
  const push = jest.fn();

beforeEach(() => {
  (nextNavigation.useRouter as jest.Mock).mockReturnValue({ push });
  (signIn as jest.Mock).mockResolvedValue({ error: null });
  (getSession as jest.Mock).mockResolvedValue({ userData: { tipo: 'true' } });
});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário de login', () => {
		(getSession as jest.Mock).mockResolvedValue(null);
    render(<Home/>);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByText(/password/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve mostrar erro se email e senha forem vazios', async () => {
    render(<Home/>);
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/required/i)).toHaveLength(2);
    });
  });

  it('deve chamar signIn com credenciais válidas Admin', async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: null });
    (getSession as jest.Mock).mockResolvedValue({ userData: { tipo: 'true' } });
    render(<Home/>);
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'user@email.com' },
		});
    fireEvent.change(screen.getByTestId('senha'), {
      target: { value: '123456' },
		});
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'user@email.com',
        senha: '123456',
        redirect: false,
      });
      expect(push).toHaveBeenCalledWith('/admin');
    });
  });


	it('deve chamar signIn com credenciais válidas Usuário', async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: null });
    (getSession as jest.Mock).mockResolvedValue({ userData: { tipo: 'false' } });
    render(<Home/>);
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'user@email.com' },
		});
    fireEvent.change(screen.getByTestId('senha'), {
      target: { value: '123456' },
		});
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'user@email.com',
        senha: '123456',
        redirect: false,
      });
      expect(push).toHaveBeenCalledWith('/testandouser');
    });
  });



  it('deve mostrar toast em caso de erro no login', async () => {
	(signIn as jest.Mock).mockResolvedValue({ error: '9999' });

  render(<Home />);
  fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
    target: { value: 'user@email.com' },
  });
  fireEvent.change(screen.getByTestId('senha'), {
    target: { value: 'senhaerrada' },
  });
  fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

  await waitFor(() => {
    expect(signIn).toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalled();
  });
});

});
