# Netflix

Personal project implementing Netflix with nodeJs

# Prerequisites
- Docker (to run PostgreSQL)
- Node >= v15.3.0
# How to use?
1. Create a new file called `.env` on the same folder as this README, with contents:
```
DATABASE_DSN=postgres://postre:postre@localhost:5432/netflix
```
2. Boot the database by running
```
docker-compose up
```
3. Start the app with
`npm run start`