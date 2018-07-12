import express from 'express'
import bodyParser from 'body-parser'
import { auth, user, client, module, s_profile } from './routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// if (process.env.NODE_ENV == 'development') {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
        next()
    })
// }

app.get('/', (req, res) => {
  res.send('Hola desde express!')
})
app.use('/api/auth', auth)
app.use('/api/users', user)
app.use('/api/clients', client)
app.use('/api/modules', module)
app.use('/api/s_profile', s_profile)

export default app
