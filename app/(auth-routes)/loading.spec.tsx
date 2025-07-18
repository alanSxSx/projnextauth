import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from './loading';

describe('Loading', () => {
  it('deve renderizar o spinner com o aria-label correto', () => {
    render(<Loading />);

    const spinner = screen.getByLabelText(/carregando spinner/i);
    expect(spinner).toBeInTheDocument();
  });
});

