import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router';
import useProducts from './hooks/useProduct';

function App() {
  const { productData, error, loading } = useProducts();
  console.log("Current Data:", productData);
  console.log("Current status:", loading);

  return (
    <>
      <Header /> 
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;