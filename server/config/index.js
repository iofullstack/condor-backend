// import moment from 'moment-timezone'

export const secret = "miclavesecreta";
const USER = encodeURIComponent("mgary");
const PASSWORD = encodeURIComponent("i9J$za2vOXJl");
export const mongoUrl = `mongodb://mgary:${PASSWORD}@localhost/db-condor`;
// export const time = () => moment().tz('America/La_Paz').format()
export const time = () => {
  let date = new Date();
  return new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
};
