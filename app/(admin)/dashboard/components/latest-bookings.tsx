"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const bookings = [
  { id: 1, employee: "John Doe", meal: "Grilled Chicken Salad", date: "2023-06-15", time: "12:30 PM" },
  { id: 2, employee: "Jane Smith", meal: "Vegetarian Pasta", date: "2023-06-15", time: "12:45 PM" },
  { id: 3, employee: "Bob Johnson", meal: "Beef Stir Fry", date: "2023-06-15", time: "1:00 PM" },
  { id: 4, employee: "Alice Brown", meal: "Fish Tacos", date: "2023-06-15", time: "12:15 PM" },
  { id: 5, employee: "Charlie Davis", meal: "Margherita Pizza", date: "2023-06-15", time: "1:15 PM" },
  { id: 6, employee: "Eva Wilson", meal: "Vegan Buddha Bowl", date: "2023-06-15", time: "12:30 PM" },
  { id: 7, employee: "Frank Miller", meal: "Chicken Teriyaki", date: "2023-06-15", time: "1:30 PM" },
  { id: 8, employee: "Grace Lee", meal: "Caesar Salad", date: "2023-06-15", time: "12:45 PM" },
  { id: 9, employee: "Henry Taylor", meal: "Sushi Platter", date: "2023-06-15", time: "1:00 PM" },
  { id: 10, employee: "Ivy Chen", meal: "Quinoa Bowl", date: "2023-06-15", time: "12:15 PM" },
];

export function LatestBookings() {
  return (
    <Card className="w-full border border-gray-200 rounded-lg shadow-xl bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">Latest Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="table-auto w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl">
              <TableHead className="px-6 py-3 text-left font-semibold">Employee</TableHead>
              <TableHead className="px-6 py-3 text-left font-semibold">Meal</TableHead>
              <TableHead className="px-6 py-3 text-left font-semibold">Date</TableHead>
              <TableHead className="px-6 py-3 text-left font-semibold">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow
                key={booking.id}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-100"
                    : "bg-gray-200"
                } hover:bg-blue-300 transition-all duration-300`}
              >
                <TableCell className="px-6 py-4 text-gray-700 text-lg">{booking.employee}</TableCell>
                <TableCell className="px-6 py-4 text-gray-700 text-lg">{booking.meal}</TableCell>
                <TableCell className="px-6 py-4 text-gray-700 text-lg">{booking.date}</TableCell>
                <TableCell className="px-6 py-4 text-gray-700 text-lg">{booking.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
