import { describe, it, expect, vi} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import routes from './components/Routes/routes';
import userEvent from '@testing-library/user-event';

window.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ products: [] }),
  })
);

describe('App', () => {
  it('initially renders home page', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const heading = screen.getByRole('heading', { name: /emazon/i });
      expect(heading).toBeInTheDocument();
    });
  });

  it('renders shop page when user clicks shop link', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const shopLink = screen.getByRole('link', { name: /shop/i });

    await user.click(shopLink);
    const heading = screen.getByRole('heading', { name: /shop/i });

    expect(heading).toBeInTheDocument();
  });

  it('renders cart page when user clicks cart link', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const cartLink = screen.getByRole('link', { name: /cart/i });

    await user.click(cartLink);
    const heading = screen.getByRole('heading', { name: /cart/i });

    expect(heading).toBeInTheDocument();
  });

  it('renders home page when user clicks home link', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const cartLink = screen.getByRole('link', { name: /cart/i });
    const homeLink = screen.getByRole('link', { name: /home/i });

    await user.click(cartLink);
    await user.click(homeLink);
    const heading = screen.getByRole('heading', { name: /emazon/i });

    expect(heading).toBeInTheDocument();
  });
});