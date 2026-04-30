import { beforeEach, describe, expect, it, vi } from "vitest";
import CategoryCard from "./CategoryCard";
import { render, screen } from "@testing-library/react";
import * as reactRouter from 'react-router';
import userEvent from "@testing-library/user-event";


vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

const mockCategory = "beauty";
const mockCategoryItems = [
  {
    id: 1,
    title: 'Test Product1',
    price: 10,
    images: ['test.jpg'],
    description: 'Test description1',
    rating: 4.5
  },
  {
    id: 2,
    title: 'Test Product2',
    price: 5,
    images: ['test.jpg'],
    description: 'Test description2',
    rating: 4.5
  },
];

describe('CategoryCard', () => {
  beforeEach(() => {
    vi.mocked(reactRouter.useOutletContext).mockReturnValue({
      shoppingCart: [],
      addToCart: vi.fn(),
      MAX_ITEM_QUANTITY: 10
    });
  });

  it('shows all itemCards from its category', () => {
    render(<CategoryCard category={mockCategory} categoryItems={mockCategoryItems} />);

    const firstItem = screen.getByText(/test product1/i);
    const secondItem = screen.getByText(/test product2/i);

    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
  });

  it('hides categoryItems when hide button is clicked', async () => {
    render(<CategoryCard category={mockCategory} categoryItems={mockCategoryItems} />);

    const user = userEvent.setup();
    const firstItem = screen.getByText(/test product1/i);
    const hideButton = screen.getByRole('button', { name: /hide/i });

    expect(firstItem).toBeInTheDocument();
    await user.click(hideButton);

    expect(firstItem).not.toBeInTheDocument();
    expect(hideButton).toHaveTextContent(/show/i);
  });

  it('shows categoryItems when show button is clicked', async () => {
    render(<CategoryCard category={mockCategory} categoryItems={mockCategoryItems} />);

    const user = userEvent.setup();
    const hideButton = screen.getByRole('button', { name: /hide/i });

    await user.click(hideButton);

    const showButton = screen.getByRole('button', { name: /show/i });
    await user.click(showButton);

    const firstItem = screen.getByText(/test product1/i);
    expect(firstItem).toBeInTheDocument();
    expect(hideButton).toHaveTextContent(/hide/i);
  });
});