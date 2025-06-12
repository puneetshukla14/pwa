import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// ✅ Type-safe global cache declaration for TS + hot reload
type MongooseCacheType = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongooseCache: MongooseCacheType | undefined
}

const globalCache = globalThis as typeof globalThis & {
  mongooseCache: MongooseCacheType
}

if (!globalCache.mongooseCache) {
  globalCache.mongooseCache = { conn: null, promise: null }
}

async function dbConnect(): Promise<typeof mongoose> {
  if (globalCache.mongooseCache.conn) return globalCache.mongooseCache.conn

  if (!globalCache.mongooseCache.promise) {
    globalCache.mongooseCache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: 'expensexpro',
    })
  }

  globalCache.mongooseCache.conn = await globalCache.mongooseCache.promise
  return globalCache.mongooseCache.conn
}

export default dbConnect
