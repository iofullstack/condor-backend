import Debug from 'debug'
import { Saucer } from '../models'

const debug = new Debug('condor-cafe:db-api:Saucer')

export default {
  create: (s) => {
    debug(`Creating new Saucer ${s}`)
    const saucer = new Saucer(s)
    return saucer.save()
  }
}
