"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "2023-01-01", bookings: 157 },
  { date: "2023-01-02", bookings: 176 },
  { date: "2023-01-03", bookings: 195 },
  { date: "2023-01-04", bookings: 189 },
  { date: "2023-01-05", bookings: 202 },
  { date: "2023-01-06", bookings: 187 },
  { date: "2023-01-07", bookings: 134 },
  { date: "2023-01-08", bookings: 152 },
  { date: "2023-01-09", bookings: 198 },
  { date: "2023-01-10", bookings: 205 },
]

export function MealBookingTrend() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="bookings" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

