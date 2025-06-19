"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminLayout } from "@/components/admin-layout"
import { Target, TrendingUp, Award, Crown } from "lucide-react"

const performanceData = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    department: "Engineering",
    role: "Senior Software Engineer",
    performanceScore: 9.2,
    engagementScore: 8.5,
    productivity: 94,
    isTopPerformer: true,
    trend: "up",
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    department: "Sales",
    role: "Sales Manager",
    performanceScore: 8.8,
    engagementScore: 7.8,
    productivity: 91,
    isTopPerformer: true,
    trend: "up",
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    department: "Marketing",
    role: "Marketing Specialist",
    performanceScore: 7.2,
    engagementScore: 6.2,
    productivity: 78,
    isTopPerformer: false,
    trend: "down",
  },
]

export default function AdminPerformancePage() {
  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold animate-fade-in-left">
              Performance Management
              <span className="block text-lg font-normal opacity-90 mt-2">
                Track and analyze employee performance metrics
              </span>
            </h1>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.4</div>
              <p className="text-xs text-muted-foreground">+0.3 from last quarter</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67</div>
              <p className="text-xs text-muted-foreground">12% of total employees</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productivity Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+5% from last quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance List */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Employee Performance Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((employee, index) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                      {employee.isTopPerformer && <Crown className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <div>
                      <h3 className="font-semibold">{employee.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {employee.role} • {employee.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">{employee.performanceScore}</div>
                      <div className="text-xs text-gray-500">Performance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{employee.engagementScore}</div>
                      <div className="text-xs text-gray-500">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{employee.productivity}%</div>
                      <div className="text-xs text-gray-500">Productivity</div>
                    </div>
                    <Badge variant={employee.trend === "up" ? "default" : "destructive"}>
                      {employee.trend === "up" ? "↗" : "↘"} {employee.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
