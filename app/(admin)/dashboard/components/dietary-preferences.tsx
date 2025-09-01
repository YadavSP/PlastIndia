"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Regular", value: 60, color: "#0088FE" },
  { name: "Vegetarian", value: 20, color: "#00C49F" },
  { name: "Vegan", value: 10, color: "#FFBB28" },
  { name: "Gluten-Free", value: 5, color: "#FF8042" },
  { name: "Keto", value: 5, color: "#8884D8" },
]

export function DietaryPreferences() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dietary Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

