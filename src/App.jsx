import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { Outlet } from 'react-router';
import useProducts from './hooks/useProduct';
import { useMemo, useState } from 'react';
import { getObjectsByCategory } from './utils/dataHelpers';

function getRandomItems(array, number) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, number);
}

const MAX_ITEM_QUANTITY = 10;

const getValidatedQuantity = (currentQty, amountToAdd) => {
  const total = currentQty + amountToAdd;
  
  if (total > MAX_ITEM_QUANTITY) return MAX_ITEM_QUANTITY;

  return total;
};

const homeCategoryList = ["mobile-accessories", "beauty", "groceries", "kitchen-accessories"];

function App() {
  const { productData, error, loading } = useProducts();
  const [shoppingCart, setShoppingCart] = useState([])

  const addToCart = (newItem, quantityToAdd) => {
    setShoppingCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id
            ? { id: item.id, quantity: getValidatedQuantity(item.quantity, quantityToAdd) }
            : item
        );
      }

      return [...prevCart, { id: newItem.id, quantity: getValidatedQuantity(0, quantityToAdd) }];
    });
  };

  console.log("shopping cart:", shoppingCart);

  const randomHomeData = useMemo(() => {
    if (!productData || loading) return {};
    return homeCategoryList.reduce((acc, category) => {
      const filtered = getObjectsByCategory(productData, category);
      acc[category] = getRandomItems(filtered, 4);
      return acc;
    }, {});
  }, [productData, loading]);

  return (
    <>
      <Header /> 
      <main>
        {loading && <LoadingSpinner />}
        {error && <h2 className='error-message'>Could not load products. Please try again. Error: {error}</h2>}
        {!loading && !error &&
        <Outlet context={
          {
            randomHomeData,
            homeCategoryList, 
            shoppingCart, 
            addToCart, 
            MAX_ITEM_QUANTITY, 
            productData,
          }
        }
        />
        }  
      </main>
      <Footer />
    </>
  )
}

export default App;