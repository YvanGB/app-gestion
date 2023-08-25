import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';

const Demo = () => {
  // const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [state, setState] = useState({
    isLoading: true,
    produits:[],
    error:''
})

// const useFetchProducts = async () => {
//   axios.get("http://localhost:5000/products")
//       .then(res =>{
//           const resultats = res.data;
//           setState({
//               ...state,
//               isLoading:false,
//               produits:resultats,
//           })
//           localStorage.setItem('produits', JSON.stringify(state.produits))
//       }).catch(err => setState({...state ,error:err}))
// }

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res =>{
          const resultats = res.data;
          setState({
              ...state,
              isLoading:false,
              produits:resultats,
          })
          localStorage.setItem('produits', JSON.stringify(state.produits))
      }).catch(err => setState({...state ,error:err}))
  }, []);


  const handleViewDetails = (productId) => {
    const produit = state.produits.find((p) => p.id === productId);
    setSelectedProduct(produit);
  };

  const handleEdit = (productId) => {
    // Implement edit functionality here
    console.log('Edit product:', productId);
  };

  const handleDelete = (productId) => {
    // Implement delete functionality here
    console.log('Delete product:', productId);
  };

  const handleSubmit = async (productData) => {
    try {
      const response = await axios.post('http://localhost:5000/products', productData);
      setState({...state, produits: response.data});
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Liste des produits</h2>
          <ProductList
            produits={state.produits}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Col>
        <Col md={6}>
          <h2>Détails du produit</h2>
          {selectedProduct ? (
            <ProductDetails product={selectedProduct} />
          ) : (
            <p>Sélectionnez un produit pour voir les détails.</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Ajouter un produit</h2>
          <ProductForm onSubmit={handleSubmit} />
        </Col>
      </Row>
    </Container>
  );
};

export default Demo;
