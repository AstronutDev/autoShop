const express = require('express')
const router = express('')
const Blog = require('../models/Blog')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 100
    }
})
// const upload = multer({dest: '../public/uploads'})

router.get('/new', (req, res, next) => {
    res.render('new')
})

router.get('/:id', async (req, res, next) => {
    let {id} = req.params
    try {
        let blog = await Blog.findById(id)
        if(blog) {
            res.render('show', {blog: blog})
        } else {
            res.redirect('/')
        }
    } catch (error) {
        next(err)
    }
})

router.post('/', upload.single('image'), async (req, res, next) => {
    let {title, author, description} = req.body
    try {
        let blog = await Blog.create({
            title,
            author,
            description,
            img: req.file.filename
        })
        res.redirect(`blogs/${blog.id}`)
    } catch (error) {
        console.log(error);
        next(error)
    }
})

module.exports = router