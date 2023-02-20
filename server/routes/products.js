const router = require(`express`).Router()

const productsModel = require(`../models/products`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')


// read all records
router.get(`/products`, (req, res) =>
{
    //user does not have to be logged in to see product details
    productsModel.find((error, data) =>
    {
        res.json(data)
    })
})
//
//
// Read one record
router.get(`/products/:id`, (req, res) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            productsModel.findById(req.params.id, (error, data) =>
            {
                res.json(data)
            })
        }
    })
})


// Add new record
router.post(`/products`, (req, res) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
            {
                // Use the new product details to create a new product document
                productsModel.create(req.body, (error, data) =>
                {
                    res.json(data)
                })
            }
            else
            {
                res.json({errorMessage:`User is not an administrator, so they cannot add new records`})
            }
        }
    })
})


// Update one record
router.put(`/products/:id`, (req, res) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            productsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
            {
                res.json(data)
            })
        }
    })
})


// Delete one record
router.delete(`/products/:id`, (req, res) =>
{

    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
            {
                productsModel.findByIdAndRemove(req.params.id, (error, data) =>
                {
                    res.json(data)
                })
            }
            else
            {
                res.json({errorMessage:`User is not an administrator, so they cannot delete records`})
            }
        }
    })
})

module.exports = router