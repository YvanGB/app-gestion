//Importation du module mongoose de mongodb
const mongoose = require('mongoose');


const CategorieSchema = new mongoose.Schema({
    nom:{
        type:String,
    },
    description:{
        type:String,
    }
})

const Categorie = mongoose.model("Categorie", CategorieSchema);

const ProduitSchema = new mongoose.Schema({
    nom : {
        type: String,
    },
    prix : {
        type: Number,
    },
    description:{
        type:String
        ,
    required:[true,'Description est obligatoire']
    },
    categorie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    }
    
});

const Produit = mongoose.model("Produit", ProduitSchema);


//Exportation de Produit et Categorie
module.exports = {
    Categorie,
    Produit
};