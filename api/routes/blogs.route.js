const { Router} = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { blogsGet, blogGetPublic, blogsgetpagination, blogsGetPublic, blogPost, blogPut, blogShow, blogActive,
    blogDelete } = require("../controllers/blogs.controller");

const router = Router();

router.get('/', [
    validateJWT
] , blogsGet);

router.get('/public', blogsGetPublic);

router.get('/comunicados',blogsgetpagination );

router.get('/public/:slug', [
    validateFields
] , blogGetPublic);


router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], blogPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], blogPut);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], blogShow);

router.post('/active', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('option', 'La opcion es obligatorio').not().isEmpty(),
    validateFields
], blogActive);


router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], blogDelete);

module.exports = router;
