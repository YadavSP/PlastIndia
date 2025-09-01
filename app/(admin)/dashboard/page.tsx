"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MealBookingTrend } from "./components/meal-booking-trend";
import { PopularMeals } from "./components/popular-meals";
import { DietaryPreferences } from "./components/dietary-preferences";
import { BookingsByDepartment } from "./components/bookings-by-department";
import { MealSatisfaction } from "./components/meal-satisfaction";
import { WeeklyBookingTrend } from "./components/weekly-booking-trend";
import { MealTypeDistribution } from "./components/meal-type-distribution";
import { LatestBookings } from "./components/latest-bookings";
import { useEffect, useState } from "react";

// Fetch meal data from the API
async function fetchMealData(empnumber) {
  const response = await fetch("/api/mealdata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ empnumber }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meal data");
  }

  return response.json();
}

export default function DashboardPage() {
  const [mealData, setMealData] = useState({
    TotalBookings: 0,
    TotalBreakfast: 0,
    TotalLunch: 0,
    TotalSnacks: 0,
  });

  const empnumber = "514546"; // Replace with actual employee number

  // Fetch meal data on page load
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchMealData(empnumber);
        console.log("Fetched data:", data); // Log the fetched data for inspection
        setMealData({
          TotalBookings: data[0]?.TotalBookings || 0,
          TotalBreakfast: data[0]?.TotalBreakfast || 0,
          TotalLunch: data[0]?.TotalLunch || 0,
          TotalSnacks: data[0]?.TotalSnacks || 0,
        });
      } catch (error) {
        console.error("Error fetching meal data:", error);
      }
    }

    getData();
  }, [empnumber]);

  return (
    <div
      className="flex-1 space-y-4 p-8 pt-6"
      style={{
        background: "linear-gradient(135deg, #fddde6, #fce8d5, #dff0d8, #d5e7f9)",
      }}
    >
       <div className="flex items-center justify-center">
    <h2
      className="text-2xl font-bold tracking-tight text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2 px-2 rounded-lg shadow-lg"
      style={{
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      Meal Booking Dashbaord
    </h2>
  </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Bookings */}
            <Card className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 border border-blue-400 rounded-lg shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-xl font-semibold text-white tracking-tight">
                  Total Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-extrabold text-white">{mealData.TotalBookings}</div>
                  <div className="text-sm text-gray-200">
                    <span className="text-green-400">+20.1%</span> from last month
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-200">
                  This reflects the overall meal bookings for the month.
                </div>
              </CardContent>
            </Card>

            {/* Breakfast */}
            <Card className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 border border-green-500 rounded-lg shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-xl font-semibold text-white tracking-tight">
                  Breakfast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-extrabold text-white">{mealData.TotalBreakfast}</div>
                  <div className="text-sm text-gray-200">
                    <span className="text-green-400">+10.5%</span> from last week
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-200">
                  Average daily breakfast bookings.
                </div>
              </CardContent>
            </Card>

            {/* Lunch */}
            <Card className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 border border-yellow-500 rounded-lg shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-xl font-semibold text-white tracking-tight">
                  Lunch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-extrabold text-white">{mealData.TotalLunch}</div>
                  <div className="text-sm text-gray-200">
                    Ordered <span className="font-semibold text-yellow-200">324</span> times this month
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-200">
                  Most popular meal during lunch this month.
                </div>
              </CardContent>
            </Card>

            {/* Snacks */}
            <Card className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 border border-purple-500 rounded-lg shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-xl font-semibold text-white tracking-tight">
                  Snacks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-extrabold text-white">{mealData.TotalSnacks}</div>
                  <div className="text-sm text-gray-200">
                    <span className="text-purple-400">+2%</span> from last quarter
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-200">
                  Snack bookings over the last quarter.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend and Popular Meals */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle>Meal Booking Trend</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <MealBookingTrend />
              </CardContent>
            </Card>
            <Card className="col-span-3 bg-pink-100 border border-pink-400 rounded-lg shadow-lg">
              {/* <CardHeader>
                <CardTitle>Bookings by Department</CardTitle>
              </CardHeader> */}
              <CardContent>
              <DietaryPreferences />
              </CardContent>
            </Card>
          </div>

          {/* Preferences and Department */}
          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4 bg-indigo-100 border border-indigo-400 p-4 rounded-lg shadow-lg">
              <DietaryPreferences />
            </div>
            <div className="col-span-3 bg-teal-100 border border-teal-400 p-4 rounded-lg shadow-lg">
              <Card className="col-span-3 bg-pink-100 border border-pink-400 rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle>Popular Meals</CardTitle>
                </CardHeader>
                <CardContent>
                  <PopularMeals />
                </CardContent>
              </Card>
            </div>
          </div> */}

          {/* Weekly Trend and Distribution */}
          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4 bg-cyan-100 border border-cyan-400 p-4 rounded-lg shadow-lg">
              <WeeklyBookingTrend />
            </div>
            <div className="col-span-3 bg-orange-100 border border-orange-400 p-4 rounded-lg shadow-lg">
              <MealTypeDistribution />
            </div>
          </div> */}

          {/* Latest Bookings */}
          <div className="col-span-7 bg-red-100 border border-red-400 p-4 rounded-lg shadow-lg">
            <LatestBookings />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-lime-100 border border-lime-400 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle>Meal Satisfaction Ratings</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <MealSatisfaction />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
