"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Server,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Settings,
  Zap,
} from "lucide-react"
import { AdminLayout } from "@/components/admin-layout"
import { useToast } from "@/hooks/use-toast"

// System health data
const systemMetrics = {
  server: {
    status: "healthy",
    uptime: "99.9%",
    responseTime: "45ms",
    load: 23,
    lastRestart: "2024-01-10T08:30:00Z",
  },
  database: {
    status: "healthy",
    connections: 45,
    maxConnections: 100,
    queryTime: "12ms",
    storage: 68,
    backupStatus: "completed",
  },
  network: {
    status: "healthy",
    bandwidth: 85,
    latency: "8ms",
    packetsLost: 0.01,
    throughput: "1.2 GB/s",
  },
  storage: {
    status: "warning",
    used: 78,
    available: "2.1 TB",
    total: "10 TB",
    growth: "+5% this month",
  },
  memory: {
    status: "healthy",
    used: 45,
    available: "32 GB",
    total: "64 GB",
    cached: "12 GB",
  },
  cpu: {
    status: "healthy",
    usage: 32,
    cores: 16,
    temperature: "42°C",
    processes: 156,
  },
}

const systemLogs = [
  {
    id: 1,
    timestamp: "2024-01-15T10:30:00Z",
    level: "info",
    service: "API Server",
    message: "Health check completed successfully",
  },
  {
    id: 2,
    timestamp: "2024-01-15T10:25:00Z",
    level: "warning",
    service: "Storage",
    message: "Disk usage above 75% threshold",
  },
  {
    id: 3,
    timestamp: "2024-01-15T10:20:00Z",
    level: "info",
    service: "Database",
    message: "Backup completed successfully",
  },
  {
    id: 4,
    timestamp: "2024-01-15T10:15:00Z",
    level: "error",
    service: "Email Service",
    message: "Failed to send notification email",
  },
  {
    id: 5,
    timestamp: "2024-01-15T10:10:00Z",
    level: "info",
    service: "Authentication",
    message: "User session cleanup completed",
  },
]

export default function SystemHealthPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedMetric, setSelectedMetric] = useState("overview")
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
        title: "System Health Updated",
        description: "All system metrics have been refreshed.",
      })
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "default"
      case "warning":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-600 bg-red-50 dark:bg-red-900/20"
      case "warning":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
      case "info":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  const exportSystemLogs = () => {
    const data = {
      metrics: systemMetrics,
      logs: systemLogs,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `system-health-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Export Successful",
      description: "System health data has been exported successfully.",
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-bold animate-fade-in-left">
                  System Health Monitor
                  <span className="block text-lg font-normal opacity-90 mt-2">
                    Real-time monitoring of system performance and health metrics
                  </span>
                </h1>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                  <span>•</span>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Activity className="h-3 w-3 mr-1" />
                    Live Monitoring
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
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </Button>
                <Button
                  variant="outline"
                  onClick={exportSystemLogs}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 hover-lift animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Server</CardTitle>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Server className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(systemMetrics.server.status)}
                <Badge variant={getStatusColor(systemMetrics.server.status)} className="text-xs">
                  {systemMetrics.server.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">{systemMetrics.server.uptime}</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">Uptime</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 hover-lift animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Database</CardTitle>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(systemMetrics.database.status)}
                <Badge variant={getStatusColor(systemMetrics.database.status)} className="text-xs">
                  {systemMetrics.database.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {systemMetrics.database.connections}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Active Connections</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 hover-lift animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Network</CardTitle>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Wifi className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(systemMetrics.network.status)}
                <Badge variant={getStatusColor(systemMetrics.network.status)} className="text-xs">
                  {systemMetrics.network.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {systemMetrics.network.latency}
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Latency</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800 hover-lift animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Storage</CardTitle>
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <HardDrive className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(systemMetrics.storage.status)}
                <Badge variant={getStatusColor(systemMetrics.storage.status)} className="text-xs">
                  {systemMetrics.storage.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                {systemMetrics.storage.used}%
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Used</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-teal-200 dark:border-teal-800 hover-lift animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-teal-700 dark:text-teal-300">Memory</CardTitle>
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <MemoryStick className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(systemMetrics.memory.status)}
                <Badge variant={getStatusColor(systemMetrics.memory.status)} className="text-xs">
                  {systemMetrics.memory.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-teal-900 dark:text-teal-100">{systemMetrics.memory.used}%</div>
              <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">Used</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800 hover-lift animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">CPU</CardTitle>
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Cpu className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(systemMetrics.cpu.status)}
                <Badge variant={getStatusColor(systemMetrics.cpu.status)} className="text-xs">
                  {systemMetrics.cpu.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{systemMetrics.cpu.usage}%</div>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Usage</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Zap className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Settings className="h-4 w-4" />
              System Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Resource Usage</CardTitle>
                  <CardDescription>Current system resource utilization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-gray-600">{systemMetrics.cpu.usage}%</span>
                    </div>
                    <Progress value={systemMetrics.cpu.usage} className="h-3" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm text-gray-600">{systemMetrics.memory.used}%</span>
                    </div>
                    <Progress value={systemMetrics.memory.used} className="h-3" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Storage Usage</span>
                      <span className="text-sm text-gray-600">{systemMetrics.storage.used}%</span>
                    </div>
                    <Progress value={systemMetrics.storage.used} className="h-3" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Network Bandwidth</span>
                      <span className="text-sm text-gray-600">{systemMetrics.network.bandwidth}%</span>
                    </div>
                    <Progress value={systemMetrics.network.bandwidth} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current status of all system components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Server className="h-5 w-5 text-green-600" />
                      <span className="font-medium">API Server</span>
                    </div>
                    <Badge variant="default">Healthy</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Database</span>
                    </div>
                    <Badge variant="default">Healthy</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Wifi className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Network</span>
                    </div>
                    <Badge variant="default">Healthy</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <HardDrive className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">Storage</span>
                    </div>
                    <Badge variant="secondary">Warning</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-green-600" />
                    Server Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="font-medium">{systemMetrics.server.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Load Average</span>
                    <span className="font-medium">{systemMetrics.server.load}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uptime</span>
                    <span className="font-medium">{systemMetrics.server.uptime}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-600" />
                    Database Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Query Time</span>
                    <span className="font-medium">{systemMetrics.database.queryTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Connections</span>
                    <span className="font-medium">
                      {systemMetrics.database.connections}/{systemMetrics.database.maxConnections}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage Used</span>
                    <span className="font-medium">{systemMetrics.database.storage}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-purple-600" />
                    Network Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Latency</span>
                    <span className="font-medium">{systemMetrics.network.latency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Throughput</span>
                    <span className="font-medium">{systemMetrics.network.throughput}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Packet Loss</span>
                    <span className="font-medium">{systemMetrics.network.packetsLost}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>System Logs</CardTitle>
                    <CardDescription>Recent system events and notifications</CardDescription>
                  </div>
                  <Button variant="outline" onClick={exportSystemLogs}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover-lift"
                    >
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getLogLevelColor(log.level)}`}>
                        {log.level.toUpperCase()}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{log.service}</span>
                          <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{log.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
