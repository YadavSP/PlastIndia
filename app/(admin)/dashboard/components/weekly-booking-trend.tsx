"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "Mon", bookings: 120 },
  { day: "Tue", bookings: 132 },
  { day: "Wed", bookings: 145 },
  { day: "Thu", bookings: 140 },
  { day: "Fri", bookings: 150 },
  { day: "Sat", bookings: 80 },
  { day: "Sun", bookings: 75 },
]

export function WeeklyBookingTrend() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weekly Booking Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

