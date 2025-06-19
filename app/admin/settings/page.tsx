"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AdminLayout } from "@/components/admin-layout"
import { Settings, Shield, Bell, Database } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-600 via-slate-600 to-zinc-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold animate-fade-in-left">
              System Settings
              <span className="block text-lg font-normal opacity-90 mt-2">
                Configure system preferences and security settings
              </span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="IGNITE Corporation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" defaultValue="admin@ignite.com" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-backup">Auto Backup</Label>
                <Switch id="auto-backup" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <Switch id="two-factor" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="session-timeout">Auto Session Timeout</Label>
                <Switch id="session-timeout" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-duration">Session Duration (minutes)</Label>
                <Input id="session-duration" type="number" defaultValue="30" />
              </div>
              <Button className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Update Security Settings
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-yellow-600" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="system-alerts">System Alerts</Label>
                <Switch id="system-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="performance-alerts">Performance Alerts</Label>
                <Switch id="performance-alerts" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input id="notification-email" type="email" defaultValue="alerts@ignite.com" />
              </div>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                Database Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-cleanup">Auto Cleanup Old Data</Label>
                <Switch id="auto-cleanup" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retention-period">Data Retention (days)</Label>
                <Input id="retention-period" type="number" defaultValue="365" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Backup Now
                </Button>
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Restore
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Settings */}
        <Card className="hover-lift">
          <CardContent className="pt-6">
            <div className="flex justify-end gap-4">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
