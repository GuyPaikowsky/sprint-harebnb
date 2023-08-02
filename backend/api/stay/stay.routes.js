import express from 'express'
// import {requireAuth, requireAdmin} from '../../middlewares/requireAuth.middleware.js'
import {log} from '../../middlewares/logger.middleware.js'

//todo add addCarMsg, removeCarMsg
import {getStays, getStayById, addStay, updateStay, removeStay} from './stay.controller.js'

// middleware that is specific to this router
// router.use(requireAuth)

export const stayRoutes = express.Router()

stayRoutes.get('/', log, getStays)
stayRoutes.get('/:id', getStayById)
stayRoutes.post('/', addStay)         //TODO: add requireAuth (before addStay)
stayRoutes.put('/:id', updateStay)    //TODO: add requireAuth
stayRoutes.delete('/:id', removeStay) //TODO: add requireAuth, requireAdmin

// stayRoutes.post(':/id/msg', requireAuth, addStayMsg)
// stayRoutes.delete('/:id/msg/msgId', requireAuth, removeStayMsg)
