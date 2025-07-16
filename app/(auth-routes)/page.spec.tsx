import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Home from './page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      // outros métodos que você usa
    };
  },
}));

jest.mock('next-auth/react', () => ({
  getSession: jest.fn(() => Promise.resolve(null)),
  useSession: () => ({ data: null, status: 'unauthenticated' }),
}));

describe('Home page', () => {
  it('renders heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
