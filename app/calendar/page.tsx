"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Calendar, Clock, Users, Video } from "lucide-react"

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Calendar & Events</h1>
            <p className="text-lg opacity-90">Manage your schedule and upcoming events</p>
          </div>
        </div>

        {/* Today's Schedule */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your events for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Team Standup", time: "9:00 AM", type: "meeting", attendees: 8 },
                { title: "Project Review", time: "11:00 AM", type: "review", attendees: 5 },
                { title: "Lunch Break", time: "12:30 PM", type: "break", attendees: 0 },
                { title: "Client Call", time: "2:00 PM", type: "call", attendees: 3 },
                { title: "Code Review", time: "4:00 PM", type: "review", attendees: 4 },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      {event.type === "call" ? (
                        <Video className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Calendar className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                        {event.attendees > 0 && (
                          <>
                            <Users className="h-3 w-3 ml-2" />
                            <span>{event.attendees} attendees</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
