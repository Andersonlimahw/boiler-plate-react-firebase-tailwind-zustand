import { describe, expect, it } from 'vitest';
import { render, screen } from '../../utils/tests';

import { Sample } from './';

describe('Sample', () => {
  it('Render', async () => {
    render(<Sample />);
    expect(screen.getByTestId('element-id')).toBeInTheDocument();
  })

  it('Snapshot', async () => {
    const { asFragment } = render(<Sample />);
    expect(asFragment()).toMatchSnapshot();
  })
})