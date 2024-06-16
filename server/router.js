const express = require('express')
const {ProjectCreateHandler} = require('./controller/project.controller')

const router = express.Router()


router.post('/project/create', ProjectCreateHandler)


module.exports = {
    router
}