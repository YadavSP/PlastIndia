"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { type: "Breakfast", count: 450 },
  { type: "Lunch", count: 800 },
  { type: "Dinner", count: 350 },
  { type: "Snacks", count: 200 },
]

export function MealTypeDistribution() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Meal Type Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

