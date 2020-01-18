const { countsPerTimeUnit } = require('./utils')
const { expect } = require('chai')
const { topic_art_dates } = require('./dateData')

describe('countsPerTimeUnit', () => {
  it('should return array', () => {
    expect(countsPerTimeUnit([])).to.deep.equal([])
  })
  it('should return an array of objects. Each object has keys date and count', () => {
    expect(countsPerTimeUnit(topic_art_dates)[0]).to.have.keys('date', 'count')
  })
})