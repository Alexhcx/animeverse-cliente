//Aqui demostra como estamos usando o contexto de Productscontext em um componente, envolvendo tota a aplicação com ele.

import './App.css';
import Layout from './components/layout';
import Home from './pages/home';
import Detail from './pages/detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductsProvider } from './ProductsContext';
import QuemSomos from './pages/QuemSomos';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Checkout from './pages/Checkout';

function App() {
  return (
    <ProductsProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/:slug' element={<Detail />} />
            <Route path='/quemsomos' element={<QuemSomos />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/checkout' element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductsProvider>
  );
}

export default App;
