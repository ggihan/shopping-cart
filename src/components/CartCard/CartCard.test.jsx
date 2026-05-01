import { beforeEach, describe, expect, it, vi } from "vitest";
import * as reactRouter from 'react-router';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartCard from "./CartCard";

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

const mockItem = {
  id: 1,
  title: 'Test Product',
  price: 10,
  images: ['test.jpg'],
  description: 'Test description',
  rating: 4.5
};

describe('CartCard', () => {
  beforeEach(() => {
    vi.mocked(reactRouter.useOutletContext).mockReturnValue({
      shoppingCart: [
        { id: 1, quantity: 9 },
        { id: 2, quantity: 7 }
      ],
      updateQuantity: vi.fn(),
      removeFromCart: vi.fn(),
      MAX_ITEM_QUANTITY: 10
    });
  });

  it('shows item from shopping cart', () => {
    render(<CartCard item={mockItem} />);

    const item = screen.getByRole('heading', { name: /test product/i});

    expect(item).toBeInTheDocument();
  });

  it('calls updateQuantity with +1 when increment is clicked', async () => {
    const { updateQuantity } = reactRouter.useOutletContext();
    const user = userEvent.setup();
    render(<CartCard item={mockItem} />);

    const incBtn = screen.getByRole('button', { name: /increase quantity/i });
    await user.click(incBtn);

    expect(updateQuantity).toHaveBeenCalledWith(mockItem.id, 1);
  });

  it('calls updateQuantity with -1 when decrement is clicked', async () => {
    const { updateQuantity } = reactRouter.useOutletContext();
    const user = userEvent.setup();
    render(<CartCard item={mockItem} />);

    const decBtn = screen.getByRole('button', { name: /decrease quantity/i });
    await user.click(decBtn);

    expect(updateQuantity).toHaveBeenCalledWith(mockItem.id, -1);
  });

  it('disables increment button and prevents calls at MAX_ITEM_QUANTITY', async () => {
    const { updateQuantity } = reactRouter.useOutletContext();
    
    vi.mocked(reactRouter.useOutletContext).mockReturnValue({
      shoppingCart: [{ id: 1, quantity: 10 }],
      updateQuantity,
      MAX_ITEM_QUANTITY: 10
    });

    const user = userEvent.setup();
    render(<CartCard item={mockItem} />);

    const incBtn = screen.getByRole('button', { name: /increase quantity/i });
    
    expect(incBtn).toBeDisabled();
    await user.click(incBtn);
    expect(updateQuantity).not.toHaveBeenCalled();
  });

  it('disables decrement button at quantity 1', async () => {
    const { updateQuantity } = reactRouter.useOutletContext();
    vi.mocked(reactRouter.useOutletContext).mockReturnValue({
      shoppingCart: [{ id: 1, quantity: 1 }],
      updateQuantity,
      MAX_ITEM_QUANTITY: 10
    });

    render(<CartCard item={mockItem} />);
    const decBtn = screen.getByRole('button', { name: /decrease quantity/i });

    expect(decBtn).toBeDisabled();
  });

  it('calls removeFromCart when the remove button is clicked', async () => {
    const { removeFromCart } = reactRouter.useOutletContext();
    const user = userEvent.setup();
    render(<CartCard item={mockItem} />);

    const removeBtn = screen.getByRole('button', { name: /remove/i });
    await user.click(removeBtn);

    expect(removeFromCart).toHaveBeenCalledWith(mockItem.id);
  });
});