import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ConnexionForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = (e) => {
    e.preventDefault();
    if (username === "Admin" && password === "admin") {
      navigate('/home');
      console.log("ok");
    }
  };

  return (
    <div className='container d-flex align-items-center justify-content-center vh-100'>
      <div className='col-md-6'>
        <h1 style={{ textAlign: 'center' }}>Connexion</h1>
        <form onSubmit={validateForm}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="mb-2">Nom d'utilisateur</label>
            <input type='text' className="form-control form-control-lg" id="username" placeholder="Entrez votre nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="loginPassword" className="mb-2">Mot de passe</label>
            <input type="password" className="form-control form-control-lg" id="loginPassword" placeholder="Entrer votre mot de passe" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="text-center">
            <input type='submit' className='btn btn-warning btn-lg' value="Se connecter" />
          </div>
        </form>
        {/* <p>Vous n'avez pas de compte ? <a href='/inscription'>S'inscrire</a></p> */}
      </div>
    </div>
  );
};

export default ConnexionForm;
