const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const routes = require('./routes')
const bodyParser = require('body-parser')

const handleErrors = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  if (err.hasOwnProperty('status')) {
    console.log(JSON.stringify(err))
    res
    .status(err.code)
    .json(err)  
  } else {
    return next(err)
  }
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/', routes)
  .get('/', (req, res) => res.render('pages/index'))
  .use(handleErrors)
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
})
  .listen(PORT, () => console.log(`Listening on ${PORT}`))