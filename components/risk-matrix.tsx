"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Users,
  TrendingDown,
  Clock,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Target,
  BarChart3,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Enhanced risk analysis data
const riskFactors = [
  {
    id: "engagement",
    name: "Low Engagement",
    description: "Employees with engagement scores below 5.0",
    severity: "high",
    count: 23,
    trend: -12,
    threshold: 5.0,
    color: "red",
  },
  {
    id: "performance",
    name: "Poor Performance",
    description: "Employees with performance ratings below 3.0",
    severity: "high",
    count: 18,
    trend: -8,
    threshold: 3.0,
    color: "red",
  },
  {
    id: "satisfaction",
    name: "Low Satisfaction",
    description: "Employees with satisfaction scores below 4.0",
    severity: "medium",
    count: 34,
    trend: -5,
    threshold: 4.0,
    color: "orange",
  },
  {
    id: "attendance",
    name: "Poor Attendance",
    description: "Employees with attendance below 85%",
    severity: "medium",
    count: 12,
    trend: 3,
    threshold: 85,
    color: "orange",
  },
  {
    id: "tenure",
    name: "Short Tenure Risk",
    description: "New employees (< 6 months) at risk",
    severity: "low",
    count: 45,
    trend: 15,
    threshold: 6,
    color: "yellow",
  },
]

const highRiskEmployees = [
  {
    id: "EMP001",
    name: "John Smith",
    department: "Sales",
    role: "Sales Representative",
    riskScore: 8.5,
    factors: ["Low Engagement", "Poor Performance"],
    lastActive: "2024-01-10",
    engagementScore: 3.2,
    performanceRating: 2.8,
    satisfactionScore: 3.5,
    avatar: "JS",
  },
  {
    id: "EMP002",
    name: "Maria Garcia",
    department: "Marketing",
    role: "Marketing Coordinator",
    riskScore: 7.8,
    factors: ["Low Satisfaction", "Poor Attendance"],
    lastActive: "2024-01-12",
    engagementScore: 4.1,
    performanceRating: 3.5,
    satisfactionScore: 2.9,
    avatar: "MG",
  },
  {
    id: "EMP003",
    name: "David Chen",
    department: "Engineering",
    role: "Junior Developer",
    riskScore: 7.2,
    factors: ["Short Tenure Risk", "Low Engagement"],
    lastActive: "2024-01-14",
    engagementScore: 4.5,
    performanceRating: 3.8,
    satisfactionScore: 4.2,
    avatar: "DC",
  },
  {
    id: "EMP004",
    name: "Sarah Wilson",
    department: "Finance",
    role: "Financial Analyst",
    riskScore: 6.9,
    factors: ["Low Engagement", "Low Satisfaction"],
    lastActive: "2024-01-11",
    engagementScore: 3.8,
    performanceRating: 3.2,
    satisfactionScore: 3.1,
    avatar: "SW",
  },
]

const departmentRisks = [
  { name: "Sales", riskLevel: "high", score: 7.8, employees: 45, atRisk: 12 },
  { name: "Marketing", riskLevel: "medium", score: 6.2, employees: 32, atRisk: 8 },
  { name: "Finance", riskLevel: "high", score: 7.5, employees: 28, atRisk: 9 },
  { name: "Engineering", riskLevel: "low", score: 4.1, employees: 67, atRisk: 5 },
  { name: "HR", riskLevel: "low", score: 3.8, employees: 15, atRisk: 2 },
  { name: "Operations", riskLevel: "medium", score: 5.9, employees: 41, atRisk: 7 },
]

export function RiskMatrix() {
  const [selectedRisk, setSelectedRisk] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const { toast } = useToast()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setLastUpdated(new Date())
      toast({
        title: "Risk Analysis Updated",
        description: "All risk data has been refreshed with the latest information.",
      })
    }, 2000)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "outline"
    }
  }

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      case "medium":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "low":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      default:
        return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-red-600 dark:text-red-400"
    if (score >= 5) return "text-yellow-600 dark:text-yellow-400"
    return "text-green-600 dark:text-green-400"
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingDown className="h-3 w-3 text-red-500" />
    if (trend < 0) return <TrendingDown className="h-3 w-3 text-green-500 rotate-180" />
    return <div className="h-3 w-3" />
  }

  const exportRiskData = () => {
    const data = {
      riskFactors,
      highRiskEmployees,
      departmentRisks,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `risk-analysis-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Export Successful",
      description: "Risk analysis data has been exported successfully.",
    })
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Analysis Matrix</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Identify and monitor employees at risk of disengagement or turnover
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={exportRiskData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {riskFactors.map((factor, index) => (
          <Card
            key={factor.id}
            className={`hover-lift animate-fade-in-up ${getRiskBgColor(factor.severity)}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{factor.name}</CardTitle>
                <Badge variant={getRiskColor(factor.severity)} className="text-xs">
                  {factor.severity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{factor.count}</div>
                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                  {getTrendIcon(factor.trend)}
                  <span>{Math.abs(factor.trend)}% from last month</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">{factor.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="employees" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Users className="h-4 w-4" />
            High Risk Employees
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-2 data-[state=active]:bg-white">
            <BarChart3 className="h-4 w-4" />
            Department Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2 data-[state=active]:bg-white">
            <TrendingDown className="h-4 w-4" />
            Risk Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-6">
          <Card className="hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    High Risk Employees ({highRiskEmployees.length})
                  </CardTitle>
                  <CardDescription>Employees requiring immediate attention and intervention</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {highRiskEmployees.map((employee, index) => (
                  <Card
                    key={employee.id}
                    className="hover-lift animate-fade-in-left border-l-4 border-l-red-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {employee.avatar}
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                              <AlertTriangle className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{employee.name}</h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                {employee.role} • {employee.department}
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              {employee.factors.map((factor) => (
                                <Badge key={factor} variant="destructive" className="text-xs">
                                  {factor}
                                </Badge>
                              ))}
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Engagement:</span>
                                <p className={`font-medium ${getScoreColor(employee.engagementScore)}`}>
                                  {employee.engagementScore.toFixed(1)}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">Performance:</span>
                                <p className={`font-medium ${getScoreColor(employee.performanceRating)}`}>
                                  {employee.performanceRating.toFixed(1)}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">Satisfaction:</span>
                                <p className={`font-medium ${getScoreColor(employee.satisfactionScore)}`}>
                                  {employee.satisfactionScore.toFixed(1)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${getScoreColor(employee.riskScore)}`}>
                              {employee.riskScore.toFixed(1)}
                            </div>
                            <div className="text-xs text-gray-500">Risk Score</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Target className="h-4 w-4 mr-1" />
                              Intervene
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Department Risk Analysis
              </CardTitle>
              <CardDescription>Risk levels and employee distribution across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departmentRisks.map((dept, index) => (
                  <Card
                    key={dept.name}
                    className={`hover-lift animate-fade-in-up ${getRiskBgColor(dept.riskLevel)}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                        <Badge variant={getRiskColor(dept.riskLevel)}>{dept.riskLevel} risk</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(dept.score)}`}>{dept.score.toFixed(1)}</div>
                        <div className="text-sm text-gray-500">Risk Score</div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Total Employees</span>
                          <span className="font-medium">{dept.employees}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>At Risk</span>
                          <span className="font-medium text-red-600">{dept.atRisk}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Risk Percentage</span>
                            <span className="font-medium">{Math.round((dept.atRisk / dept.employees) * 100)}%</span>
                          </div>
                          <Progress value={(dept.atRisk / dept.employees) * 100} className="h-2" />
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-purple-500" />
                Risk Trends & Predictions
              </CardTitle>
              <CardDescription>Historical trends and predictive analytics for risk factors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Risk Factor Trends</h3>
                    {riskFactors.map((factor) => (
                      <div key={factor.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{factor.name}</span>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(factor.trend)}
                            <span className="text-sm">{Math.abs(factor.trend)}%</span>
                          </div>
                        </div>
                        <Progress value={factor.count * 2} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">{factor.count} employees affected</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Predictive Insights</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="font-medium text-red-700 dark:text-red-300">High Alert</span>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          Sales department showing 15% increase in risk factors over the past month.
                        </p>
                      </div>

                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium text-yellow-700 dark:text-yellow-300">Watch</span>
                        </div>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">
                          Marketing team engagement scores declining for 3 consecutive weeks.
                        </p>
                      </div>

                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-green-700 dark:text-green-300">Improving</span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Engineering department risk scores improved by 8% this quarter.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
