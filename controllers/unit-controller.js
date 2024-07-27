const db = require('../models')
const { Unit } = db
const { Agency } = db

const unitController = {
  unitsAll: async (req, res, next) => {
    try {
      const units = await Unit.findAll({
        raw: true,
        nest: true,
        include: [Agency]
      })
      res.render('index', { units })
    } catch (err) {
      next(err)
    }
  },
  unitsId: (req, res, next) => {
    const id = req.params.id
    return Unit.findByPk(id, {
      include: [Agency]
    })
      .then(unit => res.render('detail', { unit }))
      .catch(err => next(err))
  },
  unitsEditPage: async (req, res, next) => {
    const id = req.params.id
    let statusTrue
    try {
      const unit = await Unit.findByPk(id, {
        include: [Agency]
      })
      const data = unit.dataValues
      const Agencies = await Agency.findAll({
        raw: true,
        nest: true
      })
      // 下拉選單顯示其他仲介
      const theRestAgencies = await Agencies.filter(
        Agency => Agency.id !== data.agencyId
      )
      // 偵測unit中的已出租有無勾選
      function ifCheckedBox () {
        if (data.status === true) {
          statusTrue = true
        }
      }
      await ifCheckedBox()
      await res.render('edit', { unit, theRestAgencies, statusTrue })
    } catch (err) {
      next(err)
    }
  },
  unitsEdit: async (req, res, next) => {
    const {
      address, income, annualIncome, startDate, endDate, note, status, agencyId
    } = req.body
    try {
      if (!address || !income) {
        throw new Error('unfilled field')
      }
      // 定義前端各欄位值以符合後端資料庫格式
      const statusBoolean = (status === 'on')
      const incomeInt = parseInt(income, 10)
      const annualIncomeInt = parseInt(annualIncome, 10)

      const unit = await Unit.findByPk(req.params.id)
      if (!unit) {
        throw new Error("Unit didn't exist!")
      }
      await unit.update({
        address,
        income: incomeInt,
        annualIncome: annualIncomeInt,
        startDate,
        endDate,
        note,
        status: statusBoolean,
        agencyId
      })
      req.flash('success_msg', '此筆資訊已成功更新！')
      res.redirect(`/units/${unit.id}`)
    } catch (err) {
      next(err)
    }
  },
  unitsDeletePage: async (req, res, next) => {
    try {
      const units = await Unit.findAll({
        raw: true,
        nest: true,
        include: [Agency]
      })
      res.render('delete', { units })
    } catch (err) {
      next(err)
    }
  },
  unitsDelete: async (req, res, next) => {
    const selectedId = Object.keys(req.body)
    const selectedIdList = selectedId.map(id => parseInt(id, 10))
    try {
      await Promise.all(
        selectedIdList.map(async (id) => {
          const unit = await Unit.findByPk(id)
          if (!unit) {
            throw new Error("unit didn't exist!")
          }
          await unit.destroy()
        }))
      req.flash('success_msg', '已成功刪除資料！')
      res.redirect('/units/delete')
    } catch (err) {
      next(err)
    }
  },
  unitsCreatePage: async (req, res, next) => {
    try {
      const Agencies = await Agency.findAll({
        raw: true
      })
      res.render('new', { Agencies })
    } catch (err) {
      next(err)
    }
  },
  unitsCreate: async (req, res, next) => {
    const {
      address, income, annualIncome, startDate, endDate, note, status, agencyId
    } = req.body
    // 定義前端各欄位值以符合後端資料庫格式
    const statusBoolean = (status === 'on')
    const incomeInt = parseInt(income, 10)
    const annualIncomeInt = parseInt(annualIncome, 10)
    try {
      if (!address.trim() || !income.trim()) {
        throw new Error('請確認地址與租金已填寫！')
      }
      const unit = await Unit.create({
        address,
        income: incomeInt,
        annualIncome: annualIncomeInt,
        startDate,
        endDate,
        note,
        status: statusBoolean,
        agencyId
      })
      req.flash('success_msg', '資料已成功新增！')
      res.redirect(`/units/${unit.id}`)
    } catch (err) {
      next(err)
    }
  },
  // 供jQuery ajax取得仲介資料
  getAgencyDetail: async (req, res, next) => {
    try {
      const id = req.query.agencyId
      const agency = await Agency.findByPk(id, { raw: true })
      res.json(agency)
    } catch (err) {
      next(err)
    }
  }
}
module.exports = unitController
