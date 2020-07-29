import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

router.get('/me', (req, res) => {
  res.send({ me: 'hello' })
})

router
  .route('/cat')
  .get()
  .post()

router
  .route('/cat/:id')
  .get()
  .put()
  .delete()

app.use('/api', router)

const log = (req, res, next) => {
  console.log('logging')
  next()
}

app.get('/data', log, (req, res) => {
  res.send({ data: [1, 2, 3] })
})

app.post('/data', (req, res) => {
  console.log(req.body)
  res.send({ ok: true })
})
export const start = () => {
  app.listen(3000, () => {
    console.log('server is listening on 3000')
  })
}
