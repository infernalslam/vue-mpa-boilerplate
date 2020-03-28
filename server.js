const express = require('express')
const path = require('path')
const morgan = require('morgan')
const index = require('./routes/index')
const app = express()
const minifyHTML = require('express-minify-html')
const expressNunjucks = require('express-nunjucks')
const dotenv = require('dotenv')
dotenv.config()

app.set('views', path.join(__dirname, 'src'))
app.use(morgan('combined'))

expressNunjucks(app, {
  watch: true,
  noCache: true
})

app.use(minifyHTML({
  override:      true,
  exception_url: false,
  htmlMinifier: {
      removeComments:            true,
      collapseWhitespace:        true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes:     true,
      removeEmptyAttributes:     true,
      minifyJS:                  true
  }
}))

app.use(express.static(path.join(__dirname, 'public'), { maxAge: '30 days' }))

const livereload = require('livereload').createServer({
  exts: ['js', 'css']
})
livereload.watch(path.join(__dirname, 'views'))
livereload.watch(path.join(__dirname, 'public'))
livereload.watch(path.join(__dirname, 'src'))

app.use('/', index)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(err.status || 500)
  res.render('pages/error', {status:err.status, message:err.message})
})

console.log(`Server is running in port: ${process.env.PORT}`)

// append the versions in css and js
app.locals.deployVersion = (new Date).getTime()

module.exports = app
