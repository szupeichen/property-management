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
  },
  unitsCreatePage: (req, res, next) => {
    return Agency.findAll({
      raw: true
    })
      .then((Agencies) => { res.render('new', { Agencies }) })
      .catch(err => next(err))
  },
  unitsCreate: (req, res, next) => {
    const {
      address, income, startDate, endDate,
      note,
      status
    } = req.body
    if (!address) throw new Error('Unit address is required!')
    Unit.create({
      address,
      income,
      startDate,
      endDate,
      note,
      status
    })
      .then(() => {
        req.flash('success_messages', 'Unit was successfully created')
        res.redirect('/units/:id')
      })
      .catch(err => next(err))
  },
  getAgencyDetail: async (req, res, next) => {
    try {
      const id = req.query.agencyId
      const agency = await Agency.findByPk(id, { raw: true })
      res.json(agency)
    } catch (error) {
      next(error)
    }
  }
}
module.exports = unitController
