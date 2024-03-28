const db = require('../models')
const { Unit } = db
const { Agency } = db

const unitController = {
  unitsAll: (req, res) => {
    return Unit.findAll({
      raw: true,
      nest: true,
      include: [Agency]
    })
      .then((units) => { return res.render('index', { units }) })
      .catch((error) => { return res.status(422).json(error) })
  },
  unitsId: (req, res) => {
    const id = req.params.id
    return Unit.findByPk(id, {
      include: [Agency]
    })
      .then(unit => res.render('detail', { units: unit.toJSON() }))
      .catch(error => console.log(error))
  },
  unitsEdit: (req, res) => {
    res.render('detail')
  }
}
module.exports = unitController
