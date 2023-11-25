import { describe , expect, it } from 'vitest';

import { render, screen } from '../../utils/tests';
import { Footer } from '.';


describe('Footer', () => {
  it('render', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  })

  it('snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  })

  it('render button_power', () => {
    const { getByTestId } = render(<Footer />);
    const powerButton = getByTestId('button_power');
    expect(powerButton).toBeInTheDocument();
  })
});