"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  AlertTriangle,
  Heart,
  Target,
  RefreshCw,
  MessageSquare,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Zap,
  ArrowUp,
  ArrowDown,
  Calendar,
} from "lucide-react"
import { EngagementChart } from "@/components/engagement-chart"
import { SentimentAnalysis } from "@/components/sentiment-analysis"
import { RiskMatrix } from "@/components/risk-matrix"
import { RealtimeNotifications } from "@/components/realtime-notifications"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

// Enhanced mock data with more realistic information
const mockData = {
  kpis: {
    totalEmployees: 1247,
    avgEngagement: 7.2,
    avgSatisfaction: 6.8,
    eNPS: 42,
    highRiskEmployees: 89,
    retentionRate: 94.2,
    productivityIndex: 87.5,
    wellnessScore: 8.1,
  },
  trends: {
    engagement: [6.5, 6.8, 7.0, 7.1, 7.2],
    satisfaction: [6.2, 6.4, 6.6, 6.7, 6.8],
    turnover: [8.2, 7.8, 7.5, 6.9, 5.8],
    productivity: [82, 84, 86, 87, 87.5],
  },
  departments: [
    { name: "Engineering", engagement: 8.1, satisfaction: 7.9, employees: 324, risk: "low", productivity: 92 },
    { name: "Sales", engagement: 6.8, satisfaction: 6.5, employees: 198, risk: "medium", productivity: 85 },
    { name: "Marketing", engagement: 7.5, satisfaction: 7.2, employees: 156, risk: "low", productivity: 88 },
    { name: "HR", engagement: 8.3, satisfaction: 8.1, employees: 89, risk: "low", productivity: 90 },
    { name: "Finance", engagement: 6.2, satisfaction: 5.9, employees: 134, risk: "high", productivity: 78 },
    { name: "Operations", engagement: 7.0, satisfaction: 6.8, employees: 346, risk: "medium", productivity: 83 },
  ],
  recentAlerts: [
    { id: 1, type: "warning", message: "Finance department engagement dropped 0.8 points", time: "2 hours ago" },
    { id: 2, type: "info", message: "New survey responses: 45 completed", time: "4 hours ago" },
    { id: 3, type: "success", message: "Engineering team satisfaction increased", time: "1 day ago" },
    { id: 4, type: "warning", message: "12 employees flagged as high turnover risk", time: "1 day ago" },
  ],
  topPerformers: [
    { name: "Sarah Johnson", department: "Engineering", score: 9.2, avatar: "SJ" },
    { name: "Michael Chen", department: "Sales", score: 8.9, avatar: "MC" },
    { name: "Emily Rodriguez", department: "Marketing", score: 8.7, avatar: "ER" },
    { name: "David Park", department: "HR", score: 8.5, avatar: "DP" },
  ],
  upcomingEvents: [
    { title: "Quarterly Engagement Survey", date: "2024-02-15", type: "survey" },
    { title: "Team Building Workshop", date: "2024-02-20", type: "event" },
    { title: "Performance Reviews", date: "2024-02-25", type: "review" },
    { title: "Wellness Week", date: "2024-03-01", type: "wellness" },
  ],
}

export default function DashboardPage() {
  const [data, setData] = useState(mockData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
  const { toast } = useToast()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => ({
        ...prevData,
        kpis: {
          ...prevData.kpis,
          avgEngagement: Math.max(0, Math.min(10, prevData.kpis.avgEngagement + (Math.random() - 0.5) * 0.1)),
          avgSatisfaction: Math.max(0, Math.min(10, prevData.kpis.avgSatisfaction + (Math.random() - 0.5) * 0.1)),
          productivityIndex: Math.max(0, Math.min(100, prevData.kpis.productivityIndex + (Math.random() - 0.5) * 2)),
        },
      }))
      setLastUpdated(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
      setLastUpdated(new Date())
      toast({
        title: "Dashboard Refreshed",
        description: "All data has been updated with the latest information.",
      })
    }, 2000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  const getEngagementColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <ArrowUp className="h-3 w-3 text-green-600" />
    if (current < previous) return <ArrowDown className="h-3 w-3 text-red-600" />
    return <div className="h-3 w-3" />
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "survey":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "event":
        return <Calendar className="h-4 w-4 text-purple-600" />
      case "review":
        return <Target className="h-4 w-4 text-orange-600" />
      case "wellness":
        return <Heart className="h-4 w-4 text-green-600" />
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Enhanced Header with Gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-bold animate-fade-in-left">
                  Employee Engagement Dashboard
                  <span className="block text-lg font-normal opacity-90 mt-2">
                    Real-time insights into your organization's engagement and satisfaction
                  </span>
                </h1>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                  <span>•</span>
                  <span>{data.kpis.totalEmployees.toLocaleString()} employees</span>
                  <span>•</span>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Activity className="h-3 w-3 mr-1" />
                    Live Updates
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                  {isRefreshing ? "Refreshing..." : "Refresh Data"}
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-pulse-glow"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24 animate-bounce-gentle"></div>
        </div>

        {/* Real-time Notifications */}
        <RealtimeNotifications alerts={data.recentAlerts} />

        {/* Enhanced KPI Cards with Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 hover-lift animate-fade-in-up col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Employees</CardTitle>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 animate-scale-pulse">
                {data.kpis.totalEmployees.toLocaleString()}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
                {getTrendIcon(1247, 1230)}
                +17 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 hover-lift animate-fade-in-up col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Avg Engagement</CardTitle>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Heart className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100 animate-scale-pulse">
                {data.kpis.avgEngagement.toFixed(1)}
              </div>
              <div className="flex items-center mt-1">
                {getTrendIcon(data.kpis.avgEngagement, 6.9)}
                <p className="text-xs text-green-600 dark:text-green-400">+0.3 from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 hover-lift animate-fade-in-up col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Satisfaction</CardTitle>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 animate-scale-pulse">
                {data.kpis.avgSatisfaction.toFixed(1)}
              </div>
              <div className="flex items-center mt-1">
                {getTrendIcon(data.kpis.avgSatisfaction, 6.6)}
                <p className="text-xs text-purple-600 dark:text-purple-400">+0.2 from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800 hover-lift animate-fade-in-up col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">eNPS Score</CardTitle>
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <BarChart3 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100 animate-scale-pulse">
                {data.kpis.eNPS}
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Good score</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800 hover-lift animate-fade-in-up col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">High Risk</CardTitle>
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900 dark:text-red-100 animate-scale-pulse">
                {data.kpis.highRiskEmployees}
              </div>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">Employees at risk</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-teal-200 dark:border-teal-800 hover-lift animate-fade-in-up col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-teal-700 dark:text-teal-300">Retention Rate</CardTitle>
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <Activity className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-900 dark:text-teal-100 animate-scale-pulse">
                {data.kpis.retentionRate}%
              </div>
              <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">12-month average</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-800 hover-lift animate-fade-in-up col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Productivity</CardTitle>
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 animate-scale-pulse">
                {data.kpis.productivityIndex.toFixed(1)}%
              </div>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1">
                {getTrendIcon(data.kpis.productivityIndex, 85.2)}
                +2.3 from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Performers */}
          <Card className="hover-lift animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Top Performers
              </CardTitle>
              <CardDescription>Highest engagement scores this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover-lift"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {performer.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{performer.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{performer.department}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-yellow-600">{performer.score}</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="hover-lift animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Important dates and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover-lift"
                  >
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">{getEventIcon(event.type)}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{event.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{event.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="hover-lift animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-500" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Survey
                </Button>
                <Button variant="outline" className="w-full justify-start hover-glow">
                  <Users className="h-4 w-4 mr-2" />
                  View All Employees
                </Button>
                <Button variant="outline" className="w-full justify-start hover-glow">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start hover-glow">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Review Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Departments</span>
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="flex items-center gap-2 data-[state=active]:bg-white">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Sentiment</span>
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-2 data-[state=active]:bg-white">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Risk Analysis</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EngagementChart data={data.trends} />
              <Card className="hover-lift animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Engagement Distribution
                  </CardTitle>
                  <CardDescription>Employee engagement levels across the organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Highly Engaged (8-10)</span>
                      <span className="text-sm text-gray-600">42%</span>
                    </div>
                    <Progress value={42} className="h-3 progress-animate" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Moderately Engaged (6-7.9)</span>
                      <span className="text-sm text-gray-600">38%</span>
                    </div>
                    <Progress value={38} className="h-3 progress-animate" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Disengaged (0-5.9)</span>
                      <span className="text-sm text-gray-600">20%</span>
                    </div>
                    <Progress value={20} className="h-3 progress-animate" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.departments.map((dept, index) => (
                <Card
                  key={dept.name}
                  className="hover-lift card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                      <Badge variant={getRiskColor(dept.risk)} className="animate-pulse">
                        {dept.risk} risk
                      </Badge>
                    </div>
                    <CardDescription>{dept.employees} employees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Engagement</span>
                        <span className={`font-semibold ${getEngagementColor(dept.engagement)}`}>
                          {dept.engagement.toFixed(1)}
                        </span>
                      </div>
                      <Progress value={dept.engagement * 10} className="h-2 progress-animate" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Satisfaction</span>
                        <span className={`font-semibold ${getEngagementColor(dept.satisfaction)}`}>
                          {dept.satisfaction.toFixed(1)}
                        </span>
                      </div>
                      <Progress value={dept.satisfaction * 10} className="h-2 progress-animate" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Productivity</span>
                        <span className={`font-semibold ${getEngagementColor(dept.productivity / 10)}`}>
                          {dept.productivity}%
                        </span>
                      </div>
                      <Progress value={dept.productivity} className="h-2 progress-animate" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-6">
            <SentimentAnalysis />
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <RiskMatrix />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
