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
      .then(unit => res.render('detail', { unit }))
      .catch(error => console.log(error))
  },
  unitsEdit: (req, res) => {
    res.render('detail')
  },
  unitsDeletePage: (req, res) => {
    return Unit.findAll({
      raw: true,
      nest: true,
      include: [Agency]
    })
      .then((units) => { return res.render('delete', { units }) })
      .catch((error) => { return res.status(422).json(error) })
  },
  unitsDelete: (req, res, next) => {
    const selectedId = Object.keys(req.body)
    const selectedIdList = selectedId.map((selectedId) => { return parseInt(selectedId, 10) })
    return selectedIdList.map(async (id) => {
      await Unit.findByPk(id)
        .then(unit => {
          if (!unit) throw new Error("unit didn't exist!")
          return unit.destroy()
        })
        .then(() => res.redirect('/units/delete'))
        .catch(err => next(err))
    })
  }
}

module.exports = unitController
