import { describe, it, expect, vi, beforeEach} from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import * as reactRouter from 'react-router';
import ItemCard from './ItemCard';

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

describe('ItemCard', () => {
  beforeEach(() => {
    vi.mocked(reactRouter.useOutletContext).mockReturnValue({
      shoppingCart: [],
      addToCart: vi.fn(),
      MAX_ITEM_QUANTITY: 10
    });
  });
  
  it('increments and decrements quantity correctly', async () => {
    render(<ItemCard item={mockItem} />);
    
    const user = userEvent.setup();
    const input = screen.getByLabelText(/quantity:/i);
    const incBtn = screen.getByRole('button', { name: /increase quantity/i });
    const decBtn = screen.getByRole('button', { name: /decrease quantity/i });

    await user.click(incBtn);
    expect(input.value).toBe("2");

    await user.click(decBtn);
    expect(input.value).toBe("1");
  });

  it('prevents incrementing beyond the MAX_ITEM_QUANTITY', async () => {
    render(<ItemCard item={mockItem} />);

    const user = userEvent.setup();
    const incBtn = screen.getByRole('button', { name: /increase quantity/i });
    const input = screen.getByLabelText(/quantity:/i);

    for (let i = 0; i < 12; i++) {
      await user.click(incBtn);
    }

    expect(input.value).toBe("10");
  });

  it('prevents decrementing below 1', async () => {
    render(<ItemCard item={mockItem} />);

    const user = userEvent.setup();
    const decBtn = screen.getByRole('button', { name: /decrease quantity/i });
    const input = screen.getByLabelText(/quantity:/i);

    user.click(decBtn);
    expect(input.value).toBe("1");
  });

  it('disables Add to Cart button when item reaches MAX_ITEM_QUANTITY', () => {
    vi.mocked(reactRouter.useOutletContext).mockReturnValue({
      shoppingCart: [{ id: 1, quantity: 10 }],
      addToCart: vi.fn(),
      MAX_ITEM_QUANTITY: 10
    });

    render(<ItemCard item={mockItem} />);

    const addToCartButton = screen.getByRole('button', { name: /limit reached/i });
    expect(addToCartButton).toBeDisabled();
  });

  it('disables quantity input when item reaches MAX_ITEM_QUANTITY', () => {
    vi.mocked(reactRouter.useOutletContext).mockReturnValue({
      shoppingCart: [{ id: 1, quantity: 10 }],
      addToCart: vi.fn(),
      MAX_ITEM_QUANTITY: 10
    });

    render(<ItemCard item={mockItem} />);

    const input = screen.getByLabelText(/quantity:/i);
    expect(input).toBeDisabled();
  });

  it('calls addToCart with correct values when button is clicked', async () => {
    const mockAddToCart = vi.fn();
    vi.mocked(reactRouter.useOutletContext).mockReturnValue({
      shoppingCart: [],
      addToCart: mockAddToCart,
      MAX_ITEM_QUANTITY: 10
    });

    render(<ItemCard item={mockItem} />);
    
    const user = userEvent.setup()
    const incBtn = screen.getByRole('button', { name: /increase quantity/i });
    const addButton = screen.getByRole('button', { name: /add to cart/i });

    await user.click(incBtn);
    await user.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockItem, 2);
  });

  it('resets to 1 when the user leaves the input empty', async () => {
    render(<ItemCard item={mockItem} />);
    
    const user = userEvent.setup();
    const input = screen.getByLabelText(/quantity:/i);

    await user.clear(input);
    expect(input.value).toBe(""); 
    
    await user.tab(input);

    expect(input.value).toBe("1");
  });
});