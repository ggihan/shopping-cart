import { describe, it, expect, vi} from 'vitest';
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
  it('increments and decrements quantity correctly', async () => {
    vi.mocked(reactRouter.useOutletContext).mockReturnValue({
      shoppingCart: [],
      addToCart: vi.fn(),
      MAX_ITEM_QUANTITY: 10
    });

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
});