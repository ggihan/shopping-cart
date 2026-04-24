import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router';
import useProducts from './hooks/useProduct';
import { useMemo } from 'react';

function getObjectsByCategory(array, chosenCategory) {
  return array.filter(item => item.category === chosenCategory);
}

function getRandomItems(array, number) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, number);
}

const homeCategoryList = ["mobile-accessories", "beauty", "groceries", "kitchen-accessories"];

function App() {
  const { productData, error, loading } = useProducts();

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
        <Outlet context={{randomHomeData, homeCategoryList, loading}} />
      </main>
      <Footer />
    </>
  )
}

export default App;