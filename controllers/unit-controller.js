const db = require('../models')
const { Unit } = db
const { Agency } = db
const { User } = db
const { getUser, getId, dataTransfer, ifCheckedBox } = require('../helpers/auth-helpers')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const { Op } = require('sequelize') // 模糊查詢

const unitController = {
  unitsAll: async (req, res, next) => {
    try {
      // define pagination
      const DEFAULT_LIMIT = 9
      const page = Number(req.query.page) || 1
      const limit = DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      // get all the units
      const units = await Unit.findAndCountAll({
        raw: true,
        nest: true,
        include: [Agency],
        limit,
        offset
      })
      // 依房仲篩選的選項
      const Agencies = await Agency.findAll({
        raw: true
      })
      // 依縣市篩選的選項
      const unitCriteria = await Unit.findAll({
        raw: true
      })
      const unit = units.rows
      res.render('index', { units: unit, pagination: getPagination(limit, page, units.count), Agencies, unitCriteria })
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
  unitsId: async (req, res, next) => {
    const id = getId(req)
    try {
      const unit = await Unit.findByPk(id, {
        include: [Agency, User]
      })
      res.render('detail', { unit })
    } catch (err) {
      next(err)
    }
  },
  unitsEditPage: async (req, res, next) => {
    const id = getId(req)
    try {
      const unit = await Unit.findByPk(id, {
        include: [Agency]
      })
      const data = unit.dataValues
      console.log(data)
      const Agencies = await Agency.findAll({
        raw: true,
        nest: true
      })
      // 下拉選單顯示其他仲介
      const theRestAgencies = await Agencies.filter(
        Agency => Agency.id !== data.agencyId
      )
      // 偵測unit中的已出租有無勾選
      const status = ifCheckedBox(data)
      await res.render('edit', { unit, theRestAgencies, status })
    } catch (err) {
      next(err)
    }
  },
  unitsEdit: async (req, res, next) => {
    const {
      city, address, income, annualIncome, startDate, endDate, note, status, agencyId
    } = req.body
    // 處理前端各欄位值以符合後端資料庫格式
    const { statusBoolean, incomeInt, annualIncomeInt } = dataTransfer(status, income, annualIncome)
    // 記錄修改此筆資料的user
    const userId = getUser(req).dataValues.id
    try {
      const unit = await Unit.findByPk(req.params.id)
      if (!unit) {
        throw new Error("Unit didn't exist!")
      }
      // 檢查各欄位是否填寫正確
      if (!city.trim() || !address.trim() || !income.trim()) {
        throw new Error('請確認縣市地址與租金已填寫！')
      }
      await unit.update({
        city,
        address,
        income: incomeInt,
        annualIncome: annualIncomeInt,
        startDate,
        endDate,
        note,
        status: statusBoolean,
        agencyId,
        userId
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
      city, address, income, annualIncome, startDate, endDate, note, status, agencyId
    } = req.body
    // 處理前端各欄位值以符合後端資料庫格式
    const { statusBoolean, incomeInt, annualIncomeInt } = dataTransfer(status, income, annualIncome)
    // 記錄創建此筆資料的user
    const userId = getUser(req).dataValues.id
    try {
      if (!address.trim() || !income.trim()) {
        throw new Error('請確認地址與租金已填寫！')
      }
      const unit = await Unit.create({
        city,
        address,
        income: incomeInt,
        annualIncome: annualIncomeInt,
        startDate,
        endDate,
        note,
        status: statusBoolean,
        agencyId,
        userId
      })
      req.flash('success_msg', '資料已成功新增！')
      res.redirect(`/units/${unit.id}`)
    } catch (err) {
      next(err)
    }
  },
  // 按下search後
  search: async (req, res, next) => {
    const { keyword, cityFilter, agencyFilter, sortByDate } = req.query
    console.log('req.query')
    console.log(req.query)
    try {
      // define pagination
      const DEFAULT_LIMIT = 9
      const page = Number(req.query.page) || 1
      const limit = DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      // 準備查詢的 where 條件
      const whereConditions = {
        [Op.or]: [] // 使用數組來存儲 or 的條件
      }
      // 檢查 cityFilter 和 agencyFilter 是否有被選擇，若有則添加到查詢條件中
      if (cityFilter && cityFilter !== 'null') {
        whereConditions.city = cityFilter
      }
      if (agencyFilter && agencyFilter !== 'null') {
        whereConditions.agencyId = agencyFilter
      }
      // 模糊搜尋
      const orConditions = []
      if (keyword && keyword.trim() !== '') {
        orConditions.push(
          { city: { [Op.like]: `%${keyword}%` } },
          { address: { [Op.like]: `%${keyword}%` } },
          { note: { [Op.like]: `%${keyword}%` } }
        )
      }
      console.log('orCondition')
      console.log(orConditions)
      // 如果有 OR 條件，才加到 whereConditions 中
      if (orConditions.length > 0) {
        whereConditions[Op.or] = orConditions
      }
      console.log(whereConditions)
      // 如果 whereConditions 是空物件，設為 null 以避免篩選條件
      const whereClause = whereConditions || null
      // 驗證sortByDate是否有選，有才成立查詢條件
      const orderConditions = []
      if (sortByDate === 'ASC' || sortByDate === 'DESC') {
        orderConditions.push(['endDate', sortByDate])
      }
      // get all the units
      const units = await Unit.findAndCountAll({
        raw: true,
        nest: true,
        include: [Agency],
        limit,
        offset,
        where: whereClause,
        order: orderConditions
      })
      // 依房仲篩選的選項
      const Agencies = await Agency.findAll({
        raw: true
      })
      // 依縣市篩選的選項
      const unitCriteria = await Unit.findAll({
        raw: true
      })
      // 渲染結果
      const unit = units.rows
      console.log('來')
      console.log(unit)
      res.render('index', { units: unit, pagination: getPagination(limit, page, units.count), Agencies, unitCriteria })
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
