import { describe, it, expect, vi} from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, MemoryRouter } from 'react-router';
import Header from './components/Header/Header';
import routes from './components/Routes/routes';
import userEvent from '@testing-library/user-event';

window.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ 
      products: [
        { id: 1, title: 'Test 1', category: 'mobile-accessories', images: ['test.jpg'], price: 8.00 },
        { id: 2, title: 'Test 2', category: 'beauty', images: ['test.jpg'], price: 8.00},
        { id: 3, title: 'Test 3', category: 'groceries', images: ['test.jpg'], price: 8.00 },
        { id: 4, title: 'Test 4', category: 'kitchen-accessories', images: ['test.jpg'], price: 8.00 },
      ]
    }),
  })
);

describe('App', () => {
  it('initially renders home page', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const heading = await screen.findByRole('heading', { name: /emazon/i });
    expect(heading).toBeInTheDocument();
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
    const heading = screen.getByRole('heading', { name: /shopping cart/i });

    expect(heading).toBeInTheDocument();
  });

  it('renders home page when user clicks home link', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const cartLink = screen.getByRole('link', { name: /cart/i });
    const nav = screen.getByRole('navigation', { name: /page links/i });
    const homeLink = within(nav).getByRole('link', { name: /home/i });

    await user.click(cartLink);
    await user.click(homeLink);
    const heading = screen.getByRole('heading', { name: /emazon/i });

    expect(heading).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    vi.mocked(window.fetch).mockRejectedValueOnce(new Error("API is down"));
    
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const errorMessage = await screen.findByRole('heading', { name: /could not load/i });

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("API is down");
  });

  it('renders ErrorPage when navigating to a non-existent route', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/this-is-a-broken-link"],
    });

    render(<RouterProvider router={router} />);

    const errorHeading = await screen.findByRole('heading', { name: /this route doesn't exist/i });
    const homeLink = screen.getByRole('link', { name: /click here to return home/i });

    expect(errorHeading).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });

  it('shows loading state when fetching data', async () => {
  
    vi.mocked(window.fetch).mockReturnValue(new Promise(() => {}));

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const loadingIndicator = screen.getByText(/fetching products/i);
    const homeHeading = screen.queryByRole('heading', { name: /emazon/i });
    
    expect(loadingIndicator).toBeInTheDocument();
    expect(homeHeading).not.toBeInTheDocument();
  });

  it('header shopping cart icon shows 0 total item amount', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"],
    });

    render(<RouterProvider router={router} />);

    const cartLink = screen.getByRole('link', { name: /cart/i });

    expect(cartLink).toHaveTextContent("0");
  });

  it('header shopping cart icon shows combined total item amount', async () => {

    const mockCart = [
      { id: 1, quantity: 10 },
      { id: 2, quantity: 7 }
    ];

    const totalItems = mockCart.reduce((sum, item) => sum + item.quantity, 0);

    render(
    <MemoryRouter>
      <Header totalItems={totalItems} />
    </MemoryRouter>);

    const cartLink = screen.getByRole('link', { name: /cart/i });

    expect(cartLink).toHaveTextContent("17");
  });
});