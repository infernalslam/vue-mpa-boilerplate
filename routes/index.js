const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

fs.readdirSync(path.dirname(__dirname) + '/src/pages')
  .map((route) => router.get(`/${route.split('.')[0]}`, (req, res, next) => res.render(`pages/${route.split('.')[0]}`)))

router.get('/healthcheck', (req, res) => res.send('success'))

module.exports = router
