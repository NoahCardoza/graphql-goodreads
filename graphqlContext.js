const Dataloader = require('dataloader');
const axios = require('axios');
const { promisify } = require('util');
const { get, getXML } = require('./helpers');
const parseXML = promisify(require('xml2js').parseString)

//Shell: export GOODREADS_API_KEY={API_KEY}
const goodreadsApiKey = process.env.GOODREADS_API_KEY

// Data Fetchers

const fetchAuthor = id =>
  axios.get(
    `https://www.goodreads.com/author/show.xml?key=${goodreadsApiKey}&id=${id}`
  )
  .then(get('data'))
  .then(parseXML)
  .then(get('GoodreadsResponse'))
  .then(getXML('author'))

const fetchBook = id =>
  axios.get(
    `https://www.goodreads.com/book/show/${id}.xml?key=${goodreadsApiKey}`
  )
  .then(get('data'))
  .then(parseXML)
  .then(get('GoodreadsResponse'))
  .then(getXML('book'))

// Data Loaders

module.exports = () => ({
  authorLoader: new Dataloader(
    ids => Promise.all(ids.map(fetchAuthor))
  ),
  bookLoader: new Dataloader(
    ids => Promise.all(ids.map(fetchBook))
  )
})
