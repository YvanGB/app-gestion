import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';


function ProductCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        // Récupérer la liste des catégories à partir de la réponse de l'API
        const products = response.data;
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });
  }, []);

  const customColors = ['#d2aaf0', '#fff0c8', '#faa0a0', '#c3f5fa', '#5ac85a', '#a555d7', '#fac369'];

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * customColors.length);
    return customColors[randomIndex];
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <CustomNavbar />
      <Container>
        <div className='mt-4'>
          <Row className="justify-content-center mt-5">
            {categories.map((category, index) => (
              <Col key={index} md={3}>
                <Link to={`/produits/${category}`}>
                  <Card
                    className="mb-4 mx-4 category-card"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    <Card.Body className='text-center d-flex flex-column justify-content-center'>
                      <Card.Title className="font-weight-bold text-uppercase">{category}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ProductCategories;
