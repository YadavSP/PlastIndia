"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { rating: "5 Stars", count: 450 },
  { rating: "4 Stars", count: 300 },
  { rating: "3 Stars", count: 200 },
  { rating: "2 Stars", count: 50 },
  { rating: "1 Star", count: 20 },
]

export function MealSatisfaction() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="rating" />
        <YAxis />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

