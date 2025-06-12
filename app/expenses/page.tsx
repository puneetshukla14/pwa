'use client'

import { useEffect, useState } from 'react'
import {
  FiCalendar, FiClock, FiTag, FiMapPin, FiRepeat,
  FiFileText, FiCreditCard, FiDollarSign
} from 'react-icons/fi'

export default function ExpensesPage() {
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [time, setTime] = useState(() => new Date().toTimeString().slice(0, 5))
  const [includeTime, setIncludeTime] = useState(false)
  const [category, setCategory] = useState('Groceries')
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [tags, setTags] = useState('')
  const [notes, setNotes] = useState('')
  const [location, setLocation] = useState('')
  const [recurring, setRecurring] = useState(false)
  const [multiEntry, setMultiEntry] = useState(false)
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => setLocation(`${d.city}, ${d.region}`))
      .catch(err => console.error('IP location fetch error:', err))
  }, [])

  const handleLocationInput = (q: string) => {
    setLocation(q)
    if (q.length > 2) {
      fetch(`/api/location?q=${encodeURIComponent(q)}`)
        .then(r => r.json())
        .then((list: string[]) => setLocationSuggestions(list))
        .catch(err => console.error('Location API error:', err))
    } else {
      setLocationSuggestions([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      amount: Number(amount),
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
    }

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      if (res.ok) {
        alert('Expense saved successfully.')
        setAmount('')
        setNotes('')
        setTags('')
      } else {
        alert(`Error: ${result.error || 'Unknown error occurred'}`)
      }

    } catch (err) {
      alert('Network error. Please try again.')
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6 tracking-tight">Add New Expense</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Amount */}
          <div className="relative">
            <label className="text-sm font-medium text-zinc-300 block mb-1">Amount</label>
            <div className="relative">
              <FiDollarSign className="absolute top-3 left-3 text-zinc-500" size={20} />
              <input
                type="number"
                placeholder="Enter amount (e.g. 500)"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="bg-neutral-800 pl-10 pr-4 py-3 w-full rounded-md border border-neutral-700 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">Date</label>
              <div className="relative">
                <FiCalendar className="absolute top-3 left-3 text-zinc-500" size={20} />
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-neutral-800 pl-10 pr-4 py-3 w-full rounded-md border border-neutral-700" required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-300 flex items-center gap-2 mb-1">
                <input type="checkbox" checked={includeTime} onChange={e => setIncludeTime(e.target.checked)} />
                Include Time
              </label>
              {includeTime && (
                <div className="relative">
                  <FiClock className="absolute top-3 left-3 text-zinc-500" size={20} />
                  <input type="time" value={time} onChange={e => setTime(e.target.value)} className="bg-neutral-800 pl-10 pr-4 py-3 w-full rounded-md border border-neutral-700" />
                </div>
              )}
            </div>
          </div>

          {/* Category & Payment Method */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">Category</label>
              <div className="relative">
                <FiTag className="absolute top-3 left-3 text-zinc-500" size={20} />
                <select value={category} onChange={e => setCategory(e.target.value)} className="bg-neutral-800 pl-10 pr-4 py-3 w-full rounded-md border border-neutral-700">
                  {['Groceries', 'Dining', 'Rent', 'Travel', 'Education', 'Bills', 'Other'].map(opt => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">Payment Method</label>
              <div className="relative">
                <FiCreditCard className="absolute top-3 left-3 text-zinc-500" size={20} />
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="bg-neutral-800 pl-10 pr-4 py-3 w-full rounded-md border border-neutral-700">
                  {['Cash', 'Card', 'UPI', 'Wallet', 'Bank Transfer', 'Other'].map(opt => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-1">Notes</label>
            <div className="relative">
              <FiFileText className="absolute top-3 left-3 text-zinc-500" size={20} />
              <textarea
                placeholder="Additional details (optional)"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="bg-neutral-800 pl-10 pr-4 py-3 w-full rounded-md border border-neutral-700 resize-none"
                rows={2}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-1">Tags</label>
            <div className="relative">
              <FiTag className="absolute top-3 left-3 text-zinc-500" size={20} />
              <input
                type="text"
                placeholder="E.g. food, groceries"
                value={tags}
                onChange={e => setTags(e.target.value)}
                className="bg-neutral-800 pl-10 pr-4 py-3 w-full rounded-md border border-neutral-700"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-1">Location</label>
            <div className="relative">
              <FiMapPin className="absolute top-3 left-3 text-zinc-500" size={20} />
              <input
                type="text"
                placeholder="City, State"
                value={location}
                onChange={e => handleLocationInput(e.target.value)}
                className="bg-neutral-800 pl-10 pr-4 py-3 w-full rounded-md border border-neutral-700"
              />
              {locationSuggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 bg-neutral-800 border border-neutral-700 w-full rounded-md max-h-40 overflow-auto">
                  {locationSuggestions.map(loc => (
                    <li key={loc} onClick={() => { setLocation(loc); setLocationSuggestions([]) }} className="p-2 hover:bg-neutral-700 cursor-pointer">{loc}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" checked={recurring} onChange={e => setRecurring(e.target.checked)} />
              Recurring Expense
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" checked={multiEntry} onChange={e => setMultiEntry(e.target.checked)} />
              Multi-entry Mode
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 transition text-white font-medium rounded-md py-3 text-center">
            Save Expense
          </button>
        </form>
      </div>
    </div>
  )
}
