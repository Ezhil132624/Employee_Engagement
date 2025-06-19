"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react"

interface Alert {
  id: number
  type: "warning" | "info" | "success" | "error"
  message: string
  time: string
}

interface RealtimeNotificationsProps {
  alerts: Alert[]
}

export function RealtimeNotifications({ alerts }: RealtimeNotificationsProps) {
  const [notifications, setNotifications] = useState(alerts)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification: Alert = {
        id: Date.now(),
        type: Math.random() > 0.5 ? "info" : "warning",
        message:
          Math.random() > 0.5
            ? "New survey responses received from Marketing team"
            : "Engagement score decreased in Sales department",
        time: "Just now",
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])
    }, 45000) // New notification every 45 seconds

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "secondary"
      case "error":
        return "destructive"
      case "success":
        return "default"
      default:
        return "outline"
    }
  }

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  if (!isVisible || notifications.length === 0) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 shadow-lg"
      >
        <Bell className="h-4 w-4 mr-2" />
        Show Notifications ({notifications.length})
      </Button>
    )
  }

  return (
    <Card className="mb-6 border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Real-time Alerts</h3>
            <Badge variant="outline">{notifications.length}</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {notifications.slice(0, 5).map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-fade-in-up"
            >
              {getIcon(alert.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-gray-100">{alert.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{alert.time}</span>
                  <Badge variant={getBadgeVariant(alert.type)} className="text-xs">
                    {alert.type}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => dismissNotification(alert.id)} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
