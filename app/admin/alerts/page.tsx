"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Bell, CheckCircle, Clock, XCircle, Eye, Archive, Settings } from "lucide-react"
import { AdminLayout } from "@/components/admin-layout"
import { useToast } from "@/hooks/use-toast"

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "High Turnover Risk Detected",
    description: "15 employees in Sales department showing high turnover risk indicators",
    timestamp: "2024-01-15T10:30:00Z",
    status: "active",
    department: "Sales",
    affectedEmployees: 15,
  },
  {
    id: 2,
    type: "warning",
    title: "Engagement Score Decline",
    description: "Marketing team engagement dropped by 8% this month",
    timestamp: "2024-01-15T09:15:00Z",
    status: "active",
    department: "Marketing",
    affectedEmployees: 8,
  },
  {
    id: 3,
    type: "info",
    title: "Survey Response Rate Low",
    description: "Only 45% response rate for quarterly engagement survey",
    timestamp: "2024-01-15T08:45:00Z",
    status: "acknowledged",
    department: "All",
    affectedEmployees: 0,
  },
  {
    id: 4,
    type: "success",
    title: "Performance Goal Achieved",
    description: "Engineering team exceeded quarterly performance targets",
    timestamp: "2024-01-14T16:20:00Z",
    status: "resolved",
    department: "Engineering",
    affectedEmployees: 0,
  },
]

export default function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const { toast } = useToast()

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "info":
        return <Bell className="h-5 w-5 text-blue-600" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      default:
        return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive">Active</Badge>
      case "acknowledged":
        return <Badge variant="secondary">Acknowledged</Badge>
      case "resolved":
        return <Badge variant="default">Resolved</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleAlertAction = (alertId: number, action: string) => {
    toast({
      title: "Alert Updated",
      description: `Alert ${action} successfully.`,
    })
  }

  const filteredAlerts = alerts.filter((alert) => filterStatus === "all" || alert.status === filterStatus)

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold animate-fade-in-left">
              Alert Management
              <span className="block text-lg font-normal opacity-90 mt-2">
                Monitor and manage system alerts and notifications
              </span>
            </h1>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover-lift bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6 text-center">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">
                {alerts.filter((a) => a.type === "critical" && a.status === "active").length}
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">Critical Alerts</div>
            </CardContent>
          </Card>

          <Card className="hover-lift bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600">
                {alerts.filter((a) => a.type === "warning" && a.status === "active").length}
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300">Warnings</div>
            </CardContent>
          </Card>

          <Card className="hover-lift bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6 text-center">
              <Bell className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {alerts.filter((a) => a.type === "info" && a.status === "active").length}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Info Alerts</div>
            </CardContent>
          </Card>

          <Card className="hover-lift bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {alerts.filter((a) => a.status === "resolved").length}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">Resolved</div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Management */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="active" className="flex items-center gap-2 data-[state=active]:bg-white">
              <AlertTriangle className="h-4 w-4" />
              Active
            </TabsTrigger>
            <TabsTrigger value="acknowledged" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Clock className="h-4 w-4" />
              Acknowledged
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex items-center gap-2 data-[state=active]:bg-white">
              <CheckCircle className="h-4 w-4" />
              Resolved
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Active Alerts ({alerts.filter((a) => a.status === "active").length})
                </CardTitle>
                <CardDescription>Alerts requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts
                    .filter((a) => a.status === "active")
                    .map((alert, index) => (
                      <Card
                        key={alert.id}
                        className={`hover-lift animate-fade-in-left ${getAlertColor(alert.type)}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              {getAlertIcon(alert.type)}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                                  {getStatusBadge(alert.status)}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{alert.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>Department: {alert.department}</span>
                                  <span>•</span>
                                  <span>Time: {new Date(alert.timestamp).toLocaleString()}</span>
                                  {alert.affectedEmployees > 0 && (
                                    <>
                                      <span>•</span>
                                      <span>Affected: {alert.affectedEmployees} employees</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleAlertAction(alert.id, "viewed")}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" onClick={() => handleAlertAction(alert.id, "acknowledged")}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Acknowledge
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="acknowledged" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  Acknowledged Alerts
                </CardTitle>
                <CardDescription>Alerts that have been acknowledged but not resolved</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts
                    .filter((a) => a.status === "acknowledged")
                    .map((alert) => (
                      <Card key={alert.id} className={`hover-lift ${getAlertColor(alert.type)}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              {getAlertIcon(alert.type)}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                                  {getStatusBadge(alert.status)}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{alert.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAlertAction(alert.id, "resolved")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Resolve
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resolved" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Resolved Alerts
                </CardTitle>
                <CardDescription>Successfully resolved alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts
                    .filter((a) => a.status === "resolved")
                    .map((alert) => (
                      <Card key={alert.id} className={`hover-lift ${getAlertColor(alert.type)}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              {getAlertIcon(alert.type)}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                                  {getStatusBadge(alert.status)}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{alert.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAlertAction(alert.id, "archived")}
                              >
                                <Archive className="h-4 w-4 mr-1" />
                                Archive
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  Alert Settings
                </CardTitle>
                <CardDescription>Configure alert thresholds and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Engagement Alerts</h3>
                      <div className="space-y-2">
                        <label className="flex items-center justify-between">
                          <span className="text-sm">Low engagement threshold</span>
                          <input type="number" className="w-20 p-1 border rounded" defaultValue="5.0" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-sm">Critical threshold</span>
                          <input type="number" className="w-20 p-1 border rounded" defaultValue="3.0" />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Turnover Alerts</h3>
                      <div className="space-y-2">
                        <label className="flex items-center justify-between">
                          <span className="text-sm">Risk score threshold</span>
                          <input type="number" className="w-20 p-1 border rounded" defaultValue="7.0" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-sm">Department threshold</span>
                          <input type="number" className="w-20 p-1 border rounded" defaultValue="10" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Notification Settings</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Email notifications for critical alerts
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        SMS notifications for urgent alerts
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Daily alert summary
                      </label>
                    </div>
                  </div>

                  <Button className="w-full">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
