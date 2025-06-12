import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// ✅ Declare global mongoose cache (for hot reload in dev)
declare global {
  var mongooseCache: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

// ✅ Setup global cache (for development, avoids reconnect on every request)
global.mongooseCache = global.mongooseCache || { conn: null, promise: null }

async function dbConnect() {
  if (global.mongooseCache.conn) return global.mongooseCache.conn

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: 'expensexpro',
    })
  }

  global.mongooseCache.conn = await global.mongooseCache.promise
  return global.mongooseCache.conn
}

export default dbConnect
