"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, Users, Crown, Target, Award } from "lucide-react"

interface Employee {
  id: string
  name: string
  department: string
  status: string
  employmentType: string
  engagementScore: number
  performanceRating: number
  valueScore: number
  isTopPerformer: boolean
  projects: number
  completedTasks: number
}

interface AdvancedAnalyticsProps {
  employees: Employee[]
}

export function AdvancedAnalytics({ employees }: AdvancedAnalyticsProps) {
  // Calculate analytics data
  const departmentStats = employees.reduce(
    (acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = {
          total: 0,
          active: 0,
          fullTime: 0,
          avgEngagement: 0,
          avgPerformance: 0,
          avgValue: 0,
          topPerformers: 0,
        }
      }

      acc[emp.department].total++
      if (emp.status === "active") acc[emp.department].active++
      if (emp.employmentType === "full-time") acc[emp.department].fullTime++
      if (emp.isTopPerformer) acc[emp.department].topPerformers++
      acc[emp.department].avgEngagement += emp.engagementScore
      acc[emp.department].avgPerformance += emp.performanceRating
      acc[emp.department].avgValue += emp.valueScore

      return acc
    },
    {} as Record<string, any>,
  )

  // Calculate averages
  Object.keys(departmentStats).forEach((dept) => {
    const stats = departmentStats[dept]
    stats.avgEngagement = stats.avgEngagement / stats.total
    stats.avgPerformance = stats.avgPerformance / stats.total
    stats.avgValue = stats.avgValue / stats.total
  })

  const departmentChartData = Object.entries(departmentStats).map(([dept, stats]) => ({
    department: dept,
    employees: stats.total,
    engagement: stats.avgEngagement,
    performance: stats.avgPerformance,
    valueScore: stats.avgValue,
    topPerformers: stats.topPerformers,
  }))

  const employmentTypeData = employees.reduce(
    (acc, emp) => {
      acc[emp.employmentType] = (acc[emp.employmentType] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const pieChartData = Object.entries(employmentTypeData).map(([type, count]) => ({
    name: type,
    value: count,
    percentage: Math.round((count / employees.length) * 100),
  }))

  const performanceDistribution = {
    excellent: employees.filter((emp) => emp.performanceRating >= 4.5).length,
    good: employees.filter((emp) => emp.performanceRating >= 3.5 && emp.performanceRating < 4.5).length,
    average: employees.filter((emp) => emp.performanceRating >= 2.5 && emp.performanceRating < 3.5).length,
    poor: employees.filter((emp) => emp.performanceRating < 2.5).length,
  }

  const engagementTrends = [
    { month: "Jan", engagement: 7.2, satisfaction: 6.8, retention: 94 },
    { month: "Feb", engagement: 7.4, satisfaction: 7.0, retention: 95 },
    { month: "Mar", engagement: 7.1, satisfaction: 6.9, retention: 93 },
    { month: "Apr", engagement: 7.6, satisfaction: 7.2, retention: 96 },
    { month: "May", engagement: 7.8, satisfaction: 7.4, retention: 97 },
    { month: "Jun", engagement: 7.5, satisfaction: 7.1, retention: 95 },
  ]

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"]

  const totalEmployees = employees.length
  const activeEmployees = employees.filter((emp) => emp.status === "active").length
  const topPerformers = employees.filter((emp) => emp.isTopPerformer).length
  const avgEngagement = employees.reduce((sum, emp) => sum + emp.engagementScore, 0) / employees.length
  const avgPerformance = employees.reduce((sum, emp) => sum + emp.performanceRating, 0) / employees.length
  const avgValueScore = employees.reduce((sum, emp) => sum + emp.valueScore, 0) / employees.length

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Engagement Rate</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{avgEngagement.toFixed(1)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <p className="text-xs text-green-600">+0.3 from last month</p>
                </div>
              </div>
              <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Performance Avg</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{avgPerformance.toFixed(1)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <p className="text-xs text-green-600">+0.2 from last month</p>
                </div>
              </div>
              <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Top Performers</p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{topPerformers}</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  {Math.round((topPerformers / totalEmployees) * 100)}% of workforce
                </p>
              </div>
              <Crown className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Value Score</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{avgValueScore.toFixed(0)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <p className="text-xs text-green-600">+5 from last month</p>
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Average engagement and performance by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                engagement: {
                  label: "Engagement",
                  color: "hsl(var(--chart-1))",
                },
                performance: {
                  label: "Performance",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="engagement" fill="var(--color-engagement)" name="Engagement" />
                  <Bar dataKey="performance" fill="var(--color-performance)" name="Performance" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employment Type Distribution</CardTitle>
            <CardDescription>Breakdown of employment types across the organization</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                "full-time": {
                  label: "Full-Time",
                  color: "hsl(var(--chart-1))",
                },
                "part-time": {
                  label: "Part-Time",
                  color: "hsl(var(--chart-2))",
                },
                contract: {
                  label: "Contract",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
            <CardDescription>Monthly engagement, satisfaction, and retention trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                engagement: {
                  label: "Engagement",
                  color: "hsl(var(--chart-1))",
                },
                satisfaction: {
                  label: "Satisfaction",
                  color: "hsl(var(--chart-2))",
                },
                retention: {
                  label: "Retention",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={2} />
                  <Line type="monotone" dataKey="satisfaction" stroke="var(--color-satisfaction)" strokeWidth={2} />
                  <Line type="monotone" dataKey="retention" stroke="var(--color-retention)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
            <CardDescription>Employee performance rating breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Excellent (4.5-5.0)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{performanceDistribution.excellent}</span>
                  <Badge variant="outline">
                    {Math.round((performanceDistribution.excellent / totalEmployees) * 100)}%
                  </Badge>
                </div>
              </div>
              <Progress value={(performanceDistribution.excellent / totalEmployees) * 100} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Good (3.5-4.4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{performanceDistribution.good}</span>
                  <Badge variant="outline">{Math.round((performanceDistribution.good / totalEmployees) * 100)}%</Badge>
                </div>
              </div>
              <Progress value={(performanceDistribution.good / totalEmployees) * 100} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Average (2.5-3.4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{performanceDistribution.average}</span>
                  <Badge variant="outline">
                    {Math.round((performanceDistribution.average / totalEmployees) * 100)}%
                  </Badge>
                </div>
              </div>
              <Progress value={(performanceDistribution.average / totalEmployees) * 100} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Needs Improvement (0-2.4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{performanceDistribution.poor}</span>
                  <Badge variant="outline">{Math.round((performanceDistribution.poor / totalEmployees) * 100)}%</Badge>
                </div>
              </div>
              <Progress value={(performanceDistribution.poor / totalEmployees) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Department Insights</CardTitle>
          <CardDescription>Detailed breakdown by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(departmentStats).map(([dept, stats]) => (
              <div key={dept} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{dept}</h4>
                  <Badge variant="outline">{stats.total} employees</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Active Rate</span>
                    <span className="font-medium">{Math.round((stats.active / stats.total) * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Full-Time</span>
                    <span className="font-medium">{Math.round((stats.fullTime / stats.total) * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Engagement</span>
                    <span className="font-medium">{stats.avgEngagement.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Performance</span>
                    <span className="font-medium">{stats.avgPerformance.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Top Performers</span>
                    <span className="font-medium flex items-center gap-1">
                      {stats.topPerformers}
                      {stats.topPerformers > 0 && <Crown className="h-3 w-3 text-yellow-500" />}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
