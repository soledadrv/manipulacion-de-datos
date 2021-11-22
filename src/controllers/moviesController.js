const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        Movies.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },

    'detail': (req, res) => {
        Movies.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },

    'new': (req, res) => {
        Movies.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },

    'recomended': (req, res) => {
        Movies.findAll({
            where: {
                rating: {[sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd');
    },

    create: function (req, res) {

        const errors = validationResult(req);

        if (errors.isEmpty()) {

            Movies.create(req.body)

            .then(movie => {
                res.redirect("/movies")
            })

            .catch(err => {
                res.send(err)
            })

        } else {
            res.render('moviesAdd', {errors: errors.mapped(), old: req.body});
        }
    },

    edit: function(req, res) {

        Movies.findByPk(req.params.id)

        .then(Movie => {
            res.render('moviesEdit', {Movie})
        })

        .catch(err => {
            res.send(err)
        })
    },

    update: function (req,res) {

        const errors = validationResult(req);

        if (errors.isEmpty()) {

            Movies.update(req.body,{
                where: {id: req.params.id}
            })
    
            .then(movie => {
                res.redirect("/movies")
            })
    
            .catch(err => {
                res.send(err)
            })
            
        } else {
            
            Movies.findByPk(req.params.id)

            .then(Movie => {
                res.render('moviesEdit', {Movie, errors: errors.mapped(), old: req.body})
            })

            .catch(err => {
                res.send(err)
            });
        }
        
        
    },

    delete: function (req, res) {

        Movies.findByPk(req.params.id)

        .then(Movie => {
            res.render('moviesDelete', {Movie})
        })

        .catch(err => {
            res.send(err)
        })
    },

    destroy: function (req, res) {

        Movies.destroy({
            where: {id: req.params.id}
        })

        .then(movie => {
            res.redirect("/movies")
        })

        .catch(err => {
            res.send(err)
        })
    }

}

module.exports = moviesController;