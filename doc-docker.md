docker-compose exec mongo bash

mongo -u root -p example
use admin
db.createUser({
  user:"mgary",
  pwd: "i9J$za2vOXJl",
  roles:["dbOwner"]
})
use db-condor
db.createUser({
  user:"mgary",
  pwd: "i9J$za2vOXJl",
  roles:["dbOwner"]
})
mongo -u mgary -p 'i9J$za2vOXJl'

docker cp /home/gary/coder/iofullstack/condor-backend/backup/dump mongo-condor:/tmp/

docker-compose exec mongo bash

cd /tmp
mongorestore -u mgary -p 'i9J$za2vOXJl' --db db-condor dump/db-condor


nvm use v10.19.0
Angular CLI: 6.1.5
Angular: 6.1.6

cd condor-backend
npm run start:server

cd angular-condor
ng serve
