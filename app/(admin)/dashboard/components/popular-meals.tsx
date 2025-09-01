"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Grilled Chicken Salad", bookings: 324 },
  { name: "Vegetarian Pasta", bookings: 276 },
  { name: "Beef Stir Fry", bookings: 252 },
  { name: "Fish Tacos", bookings: 218 },
  { name: "Margherita Pizza", bookings: 196 },
]

export function PopularMeals() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="bookings" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

