import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';

function Produits() {
    const navigate = useNavigate();
    const { category } = useParams();

    const [state, setState] = useState({
        isLoading: true,
        produits: [],
        selectedProduct: null,
        showModal: false,
        showDetailModal: false,
        error: ''
    });

    const handleClose = () => {
        setState(prevState => ({
            ...prevState,
            showModal: false
        }));
    };

    const handleShow = (produit) => {
        setState(prevState => ({
            ...prevState,
            selectedProduct: { ...produit },
            showModal: true
        }));
    };

    const handleShowDetail = (produit) => {
        setState(prevState => ({
            ...prevState,
            selectedProduct: { ...produit },
            showDetailModal: true
        }));
    };

    const handleCloseDetail = () => {
        setState(prevState => ({
            ...prevState,
            showDetailModal: false
        }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        navigate('/ajouterproduit');
    };

    const updateProduct = (updatedProduct) => {
        setState(prevState => {
            const updatedProduits = prevState.produits.map((produit) => {
                if (produit.id === updatedProduct.id) {
                    return updatedProduct;
                }
                return produit;
            });

            return {
                ...prevState,
                produits: updatedProduits
            };
        });
    };

    const handleDelete = (productId) => {
        axios
            .delete(`http://localhost:5000/products/${productId}`)
            .then(response => {
                const updatedProduits = state.produits.filter(produit => produit.id !== productId);
                setState(prevState => ({
                    ...prevState,
                    produits: updatedProduits
                }));
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleSubmit = () => {
        const modifiedData = {
          title: state.selectedProduct.title,
          price: state.selectedProduct.price,
          description: state.selectedProduct.description,
          category: state.selectedProduct.category
        };
      
        axios
          .put(`http://localhost:5000/products/${state.selectedProduct.id}`, modifiedData)
          .then(response => {
            const updatedProduct = response.data;
            const updatedProduits = state.produits.map(produit => {
              if (produit.id === updatedProduct.id) {
                return updatedProduct;
              }
              return produit;
            });
      
            setState(prevState => ({
              ...prevState,
              produits: updatedProduits,
              showModal: false
            }));
          })
          .catch(error => {
            console.error(error);
          });

          getProducts();
      };
      

    const getProducts = async () => {
        axios
            .get(`http://localhost:5000/products/`)
            .then(res => {
                console.log(category);
                const resultats = res.data;
                if (category) {
                    const product = resultats.filter((product) => product.category === category);
                    setState(prevState => ({
                        ...prevState,
                        isLoading: false,
                        produits: product
                    }));
                }
                else {
                    setState(prevState => ({
                        ...prevState,
                        isLoading: false,
                        produits: resultats
                    }));
                }
            })
            .catch(err => setState(prevState => ({
                ...prevState,
                error: err
            })));
    }

    useEffect(() => {
        getProducts();
    }, [category]);

    return (
        <div>
            <CustomNavbar />
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <span className="navbar-brand">Liste des produits</span>
                        <button type="button" onClick={handleAddProduct} className="btn btn-primary">Ajouter un produit</button>
                    </div>
                </nav>

                {state.selectedProduct && (
                    <Modal show={state.showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modifier le produit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="nom">Nom</label>
                                    <input type="text" value={state.selectedProduct.title} onChange={(e) => setState(prevState => ({
                                        ...prevState,
                                        selectedProduct: { ...state.selectedProduct, title: e.target.value }
                                    }))}
                                        className="form-control" id="nom" placeholder="Nom du produit" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="prix">Prix</label>
                                    <input type="text" value={state.selectedProduct.price} onChange={(e) => setState(prevState => ({
                                        ...prevState,
                                        selectedProduct: { ...state.selectedProduct, price: e.target.value }
                                    }))}
                                        className="form-control" id="prix" placeholder="Prix du produit" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" value={state.selectedProduct.description} onChange={(e) => setState(prevState => ({
                                        ...prevState,
                                        selectedProduct: { ...state.selectedProduct, description: e.target.value }
                                    }))}
                                        id="description" rows="3" placeholder="Description du produit"></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="categorie">Catégorie</label>
                                    <select onChange={(e) => setState(prevState => ({
                                        ...prevState,
                                        selectedProduct: { ...state.selectedProduct, category: e.target.value }
                                    }))}
                                        className="form-control" id="categorie">
                                        <option value="">Sélectionnez une catégorie</option>
                                        <option value="laptops">laptops</option>
                                        <option value="smartphones">smartphones</option>
                                        <option value="skincare">skincare</option>
                                        <option value="fragrances">fragrances</option>
                                        <option value="groceries">groceries</option>
                                        <option value="home-decoration">home-decoration</option>
                                    </select>
                                </div>

                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                            <Button variant="primary" onClick={handleSubmit}>Enregistrer les modifications</Button>
                        </Modal.Footer>
                    </Modal>
                )}

                {state.selectedProduct && (
                    <Modal show={state.showDetailModal} onHide={handleCloseDetail}>
                        <Modal.Header closeButton>
                            <Modal.Title>Informations du produit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h3>{state.selectedProduct.title}</h3>
                            <p>Prix: {state.selectedProduct.price}$</p>
                            <p>Description: {state.selectedProduct.description}</p>
                            <p>Catégorie: {state.selectedProduct.category}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                        </Modal.Footer>
                    </Modal>
                )}

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.produits.map((produit) => (
                            <tr key={produit.id}>
                                <td>{produit.id}</td>
                                <td>{produit.title}</td>
                                <td>{produit.price}$</td>
                                <td className="d-flex justify-content-evenly">
                                    <button className="btn btn-primary" onClick={() => handleShowDetail(produit)}>Détails</button>
                                    <button className="btn btn-secondary" onClick={() => handleShow(produit)}>Modifier</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(produit.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Produits;
