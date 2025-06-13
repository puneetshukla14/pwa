import { NextResponse } from 'next/server'
import Expense from '@/models/expense'
import dbConnect from '@/lib/mongodb'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const id = params.id
    const body = await req.json()

    let fullDate = new Date(body.date)
    if (body.includeTime && body.time) {
      fullDate = new Date(`${body.date}T${body.time}`)
    }

    const updated = await Expense.findByIdAndUpdate(
      id,
      {
        ...body,
        date: fullDate,
      },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 })
  } catch (err: any) {
    console.error('❌ Error updating expense:', err)
    return NextResponse.json({ error: 'Error updating expense' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const deleted = await Expense.findByIdAndDelete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: any) {
    console.error('❌ Error deleting expense:', err)
    return NextResponse.json({ error: 'Error deleting expense' }, { status: 500 })
  }
}
