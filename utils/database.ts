import dotenv from 'dotenv'
import * as mongoose from 'mongoose'

dotenv.config()

const DB_HOST: string = process.env.DB_HOST as string

let isConnected: boolean = false

export async function connectToDB() {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(DB_HOST, {
      dbName: 'db-ric'
    })
    isConnected = true
    console.log('MongoDB connected')

  } catch (error) {
    console.log(error)
  }
}