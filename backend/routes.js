//Module express et Router
const express = require('express');
const router = express.Router();


const {Produit, Categorie} = require('./model');

//Home
router.get('/', (req, res)=>{
    res.send("Bienvenue sur l'application de gestion de produit");
})


//Ajouter une categorie
router.post('/categorie', (req, res) => {
    const categorie = new Categorie({
        nom: req.body.nom,
        description: req.body.description
    });
    categorie.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la création de la catégorie."
        });
    });
});


//Ajouter un produit
router.post('/produit', (req, res) => {
    const produit = new Produit({
        nom: req.body.nom,
        prix: req.body.prix,
        description: req.body.description,
        categorie: req.body.categorie
    });
    produit.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la création du produit."
        });
    });
});

//Récupérer la liste de tous les produits
router.get('/produit', (req, res) => {
    Produit.find().then(produits => {
        res.send(produits);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la récupération des produits."
        });
    });
});

//Récupérer la liste de tous les produits d'une catégorie spécifique
router.get('/categorie/:id/produits', (req, res) => {
    Produit.find({ categorie: req.params.id }).then(produits => {
        res.send(produits);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la récupération des produits."
        });
    });
});


//Retourner les informations d'un produit spécifique
router.get('/produit/:id', (req, res) => {
    Produit.findById(req.params.id)
    .then(produit => {
        if (!produit) {
            return res.status(404).send({
                message: "Produit non trouvé avec l'id " + req.params.id
            });
        }
        res.send(produit);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Produit non trouvé avec l'id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération du produit avec l'id " + req.params.id
        });
    });
});

//Modifier les informations d'un produit
router.put('/produit/:id', (req, res) => {
    Produit.findByIdAndUpdate(req.params.id, {
        nom: req.body.nom,
        prix: req.body.prix,
        description: req.body.description
    }, {new: true}).then(produit => {
        if (!produit) {
            return res.status(404).send({
                message: "Produit non trouvé avec l'id " + req.params.id
            });
        }
        res.send(produit);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Produit non trouvé avec l'id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la mise à jour du produit avec l'id " + req.params.id
        });
    });
});

//Mettre à jour une catégorie 
router.put('/categorie/:id', (req, res) => {
    Categorie.findByIdAndUpdate(req.params.id, {
        nom: req.body.nom,
        description: req.body.description
    }, {new: true}).then(categorie => {
        if (!categorie) {
            return res.status(404).send({
                message: "Catégorie non trouvée avec l'id " + req.params.id
            });
        }
        res.send(categorie);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Catégorie non trouvée avec l'id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la mise à jour de la catégorie avec l'id " + req.params.id
        });
    });
});


//Supprimer un produit
router.delete('/produit/:id', (req, res) => {
    Produit.findByIdAndRemove(req.params.id).then(produit => {
        if (!produit) {
            return res.status(404).send({
                message: "Produit non trouvé avec l'id " + req.params.id
            });
        }
        res.send({message: "Produit supprimé avec succès !"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Produit non trouvé avec l'id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Impossible de supprimer le produit avec l'id " + req.params.id
        });
    });
});

//supprimer une catégorie
router.delete('/categorie/:id', (req, res) => {
    Categorie.findByIdAndRemove(req.params.id).then(categorie => {
        if (!categorie) {
            return res.status(404).send({
                message: "Catégorie non trouvée avec l'id " + req.params.id
            });
        }
        res.send({message: "Catégorie supprimée avec succès !"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Catégorie non trouvée avec l'id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Impossible de supprimer la catégorie avec l'id " + req.params.id
        });
    });
});



module.exports = router;