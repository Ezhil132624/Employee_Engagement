"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  Star,
} from "lucide-react"
import { AdminLayout } from "@/components/admin-layout"

export default function InsightsPage() {
  const [selectedInsight, setSelectedInsight] = useState("overview")

  const insights = [
    {
      id: "engagement-trend",
      title: "Engagement Trending Upward",
      description: "Overall employee engagement has increased by 12% over the last quarter",
      type: "positive",
      impact: "high",
      confidence: 92,
      recommendation: "Continue current engagement initiatives and consider expanding successful programs",
    },
    {
      id: "retention-risk",
      title: "Retention Risk in Sales",
      description: "Sales department showing early indicators of increased turnover risk",
      type: "warning",
      impact: "medium",
      confidence: 78,
      recommendation: "Implement targeted retention strategies and conduct exit interviews",
    },
    {
      id: "productivity-correlation",
      title: "Productivity-Satisfaction Link",
      description: "Strong correlation found between job satisfaction and productivity metrics",
      type: "insight",
      impact: "high",
      confidence: 89,
      recommendation: "Focus on satisfaction drivers to boost overall productivity",
    },
  ]

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "insight":
        return <Lightbulb className="h-5 w-5 text-blue-600" />
      default:
        return <Brain className="h-5 w-5 text-purple-600" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "positive":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "insight":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      default:
        return "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold animate-fade-in-left">
              AI-Powered Insights
              <span className="block text-lg font-normal opacity-90 mt-2">
                Intelligent analytics and predictive recommendations
              </span>
            </h1>
          </div>
        </div>

        {/* AI Insights Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <Card
              key={insight.id}
              className={`hover-lift animate-fade-in-up ${getInsightColor(insight.type)}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.type)}
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Impact Level</span>
                    <Badge variant={insight.impact === "high" ? "default" : "secondary"}>{insight.impact}</Badge>
                  </div>
                  <Progress value={insight.confidence} className="h-2" />
                </div>

                <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-xs font-medium mb-1">Recommendation:</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{insight.recommendation}</p>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="trends" className="flex items-center gap-2 data-[state=active]:bg-white">
              <TrendingUp className="h-4 w-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Brain className="h-4 w-4" />
              Predictions
            </TabsTrigger>
            <TabsTrigger value="correlations" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Target className="h-4 w-4" />
              Correlations
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Star className="h-4 w-4" />
              Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Engagement Trends
                  </CardTitle>
                  <CardDescription>Historical engagement patterns and forecasts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Interactive chart would be here</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">+12%</div>
                        <div className="text-xs text-gray-500">This Quarter</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">7.2</div>
                        <div className="text-xs text-gray-500">Current Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">8.1</div>
                        <div className="text-xs text-gray-500">Predicted</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-green-600" />
                    Department Performance
                  </CardTitle>
                  <CardDescription>Comparative analysis across departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-48 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Department comparison chart</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Engineering</span>
                        <Badge variant="default">Top Performer</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sales</span>
                        <Badge variant="destructive">Needs Attention</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Marketing</span>
                        <Badge variant="secondary">Improving</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Predictive Analytics
                </CardTitle>
                <CardDescription>AI-powered predictions and forecasts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Turnover Risk</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">15%</div>
                    <p className="text-xs text-gray-600">Predicted for next quarter</p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Engagement Growth</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">+8%</div>
                    <p className="text-xs text-gray-600">Expected improvement</p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Goal Achievement</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">92%</div>
                    <p className="text-xs text-gray-600">Likelihood of success</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="correlations" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Key Correlations
                </CardTitle>
                <CardDescription>Statistical relationships between metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Job Satisfaction ↔ Productivity</span>
                      <Badge variant="default">Strong (0.89)</Badge>
                    </div>
                    <Progress value={89} className="h-2 mb-2" />
                    <p className="text-sm text-gray-600">
                      Higher satisfaction strongly correlates with increased productivity
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Training Hours ↔ Engagement</span>
                      <Badge variant="secondary">Moderate (0.67)</Badge>
                    </div>
                    <Progress value={67} className="h-2 mb-2" />
                    <p className="text-sm text-gray-600">More training opportunities lead to higher engagement</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Remote Work ↔ Work-Life Balance</span>
                      <Badge variant="default">Strong (0.82)</Badge>
                    </div>
                    <Progress value={82} className="h-2 mb-2" />
                    <p className="text-sm text-gray-600">Remote work options improve work-life balance scores</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Recommended Actions
                </CardTitle>
                <CardDescription>AI-generated recommendations for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-green-800 dark:text-green-200 mb-1">
                          Implement Flexible Work Arrangements
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                          Based on correlation analysis, flexible work options could improve engagement by 15%
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            High Impact
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Low Effort
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                          Expand Training Programs
                        </div>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                          Increase training hours to boost engagement and skill development
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Medium Impact
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Medium Effort
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                          Address Sales Department Issues
                        </div>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                          Immediate intervention needed to prevent turnover in sales team
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            High Impact
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Urgent
                          </Badge>
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
    </AdminLayout>
  )
}
