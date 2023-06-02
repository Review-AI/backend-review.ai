import { Router } from 'express'
import { getReviews } from '../controllers/amazon.js'

const router = Router()

router.post("/reviews", getReviews)

export default router

module.exports = router