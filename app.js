const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config({
    path: '.env'
});

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const app = express();

// Connexion à la base de données avec mongoose
mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log('Connexion à MongoDB échouée !', err));

// helmet protection contre les attaques de type cross-site scripting
app.use(helmet());

// Définition de headers pour éviters les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Enregistrement des routeurs
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;