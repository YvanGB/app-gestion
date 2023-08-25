import React from 'react';
import CustomNavbar from '../components/CustomNavbar';

function AboutPage() {
    return (
        <div>
            <CustomNavbar />
            <div className="container-fluid d-flex justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="text-center">
                    <h1>À Propos</h1>
                    <p>Cette application a été développée pour gérer une liste de produits.</p>
                    <p>Nous avons créé les fonctionnalités suivantes :</p>
                    <ul className="list-unstyled text-left">
                        <li>Affichage de la liste des produits avec leur nom et leur prix.</li>
                        <li>Ajout d'un nouveau produit avec un formulaire.</li>
                        <li>Modification d'un produit existant avec la possibilité de modifier son nom, son prix et sa description.</li>
                        <li>Suppression d'un produit.</li>
                        <li>Affichage des détails d'un produit, y compris son titre, son prix, sa description et sa catégorie.</li>
                        <li>Affichage des différentes catégories</li>
                        <li>Affichage des produits d'une catégorie</li>
                        <li>Navigation entre les différentes pages de l'application à l'aide de la barre de navigation.</li>
                    </ul>
                    <p>Ces fonctionnalités ont été implémentées en utilisant React, React Router, Bootstrap et Axios.</p>
                    <p>Nous espérons que cette application vous sera utile dans la gestion de votre liste de produits !</p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
