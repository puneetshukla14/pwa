import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Expense from '@/models/expense'

export async function GET() {
  try {
    await dbConnect()

    const data = await Expense.aggregate([
      { $group: { _id: '$paymentMethod', total: { $sum: '$amount' } } }
    ])

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}
