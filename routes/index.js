var express = require('express');
var router = express.Router();
const Blog = require('../models/Blog')

router.get('/', async function(req, res, next) {
  const blogs = await Blog.find()
  res.render('index', { blogs: blogs });
});

module.exports = router;
