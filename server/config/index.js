// import moment from 'moment-timezone'

export const secret = 'miclavesecreta'
export const mongoUrl = 'mongodb://localhost/db-condor'
// export const time = () => moment().tz('America/La_Paz').format()
export const time = () => {
  let date = new Date()
  return new Date(date.valueOf() - date.getTimezoneOffset() * 60000)
}
