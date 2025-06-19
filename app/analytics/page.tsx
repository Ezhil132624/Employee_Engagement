"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BarChart3, TrendingUp, Target, Activity } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Personal Analytics</h1>
            <p className="text-lg opacity-90">Insights into your performance and engagement</p>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productivity</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">87%</div>
              <Progress value={87} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+12%</div>
              <p className="text-xs text-gray-600">vs last month</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goal Achievement</CardTitle>
              <Target className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">8/10</div>
              <Progress value={80} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activity Score</CardTitle>
              <Activity className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">9.2</div>
              <p className="text-xs text-gray-600">Excellent</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trends */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Trends
            </CardTitle>
            <CardDescription>Your performance metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: "Engagement Score", current: 8.5, previous: 8.2, trend: "up" },
                { metric: "Satisfaction Level", current: 7.8, previous: 7.5, trend: "up" },
                { metric: "Productivity Index", current: 87, previous: 85, trend: "up" },
                { metric: "Wellness Score", current: 8.2, previous: 8.4, trend: "down" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{item.metric}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Current: {item.current} | Previous: {item.previous}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    <TrendingUp className={`h-4 w-4 ${item.trend === "down" ? "rotate-180" : ""}`} />
                    <span className="text-sm font-medium">
                      {item.trend === "up" ? "+" : "-"}
                      {Math.abs(item.current - item.previous).toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
