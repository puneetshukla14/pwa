import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Wallet from '@/models/wallet'

export async function GET() {
  try {
    await dbConnect()
    const wallet = await Wallet.findOne({})
    if (!wallet) {
      return NextResponse.json({ error: 'No wallet data found' }, { status: 404 })
    }
    return NextResponse.json(wallet, { status: 200 })
  } catch (err: any) {
    console.error('❌ Error fetching wallet data:', err)
    return NextResponse.json({ error: 'Failed to fetch wallet data', message: err.message }, { status: 500 })
  }
}
