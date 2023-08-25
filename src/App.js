import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css';
import CustomNavbar from './components/CustomNavbar';
import ProductCategories from './components/ProductCategories';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Connexion from './pages/Connexion';
import AjouterProduit from './pages/AjouterProduit';
import Produits from './components/Produits';
import AboutPage from './pages/AboutPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Connexion />} />
        <Route path='/home' element={<Home />} />
        <Route path='/ajouterproduit' element={<AjouterProduit />} />
        <Route path='/categories' element={<ProductCategories />} />
        <Route path="/produits/:category?" element={<Produits />} />
        <Route path="/apropos" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App