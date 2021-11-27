const { check } = require('express-validator')

module.exports = [
    check('title')
        .notEmpty().withMessage('El nombre de la película es obligatorio.').bail()
        .isLength({min: 2}).withMessage('El nombre de la película debe tener al menos 2 caracteres.'),
    check('rating')
        .notEmpty().withMessage('El rating de la película es obligatorio.').bail()
        .isDecimal().withMessage('El rating de la película debe ser un número.'),
    check('length')
        .notEmpty().withMessage('La duración de la película es obligatoria.').bail()
        .isInt().withMessage('La duración de la película debe ser un número.'),
    check('awards')
        .notEmpty().withMessage('Los premios de la película son obligatorios.').bail()
        .isInt().withMessage('Los premios de la película deben ser un número.'),
    check('release_date')
        .notEmpty().withMessage('La fecha de estreno de la película es obligatoria.').bail()
        .isDate().withMessage('La fecha de estreno de la película debe tener un formato de fecha.'),
]
