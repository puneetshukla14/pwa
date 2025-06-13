import { NextResponse } from 'next/server'
import Expense from '@/models/expense'
import dbConnect from '@/lib/mongodb'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      amount,
      date,
      time,
      includeTime,
      category,
      paymentMethod,
      tags,
      notes,
      location,
      recurring,
      multiEntry,
    } = body

    if (!amount || !date || !category || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await dbConnect()

    let fullDate = new Date(date)
    if (includeTime && time) {
      fullDate = new Date(`${date}T${time}`)
    }

    const newExpense = new Expense({
      amount,
      date: fullDate,
      includeTime,
      category,
      paymentMethod,
      tags,
      notes,
      location,
      recurring,
      multiEntry,
    })

    const savedExpense = await newExpense.save()
    return NextResponse.json({ success: true, data: savedExpense }, { status: 201 })

  } catch (err: any) {
    console.error('❌ Error saving expense:', err)
    return NextResponse.json(
      { error: 'Error saving expense', message: err.message || '' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await dbConnect()
    const expenses = await Expense.find().sort({ date: -1 })
    return NextResponse.json(expenses, { status: 200 })
  } catch (err: any) {
    console.error('❌ Error fetching expenses:', err)
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 })
  }
}
