import http from 'http'
import Debug from 'debug'
import app from './app'

const PORT = 3000
const debug = Debug('condor-backend:root')

app.listen(PORT, () => {
    debug(`Server running at port ${PORT}`)
})
