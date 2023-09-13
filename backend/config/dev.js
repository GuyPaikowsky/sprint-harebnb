import dotenv from 'dotenv'

dotenv.config()

export default {
  dbURL: process.env.MONGO_URL,
  dbName: process.env.MONGO_DB_NAME,
}
