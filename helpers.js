module.exports = {
  get: key => obj => obj[key],
  getXML: key => obj => obj[key][0]
}
