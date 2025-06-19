"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Download,
  RefreshCw,
  Trash2,
  Archive,
  FileText,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
} from "lucide-react"
import { AdminLayout } from "@/components/admin-layout"
import { useToast } from "@/hooks/use-toast"

export default function DataManagementPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleDataOperation = async (operation: string) => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Operation Completed",
        description: `${operation} completed successfully.`,
      })
    }, 2000)
  }

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold animate-fade-in-left">
              Data Management
              <span className="block text-lg font-normal opacity-90 mt-2">
                Manage system data, backups, and database operations
              </span>
            </h1>
          </div>
        </div>

        {/* Data Operations */}
        <Tabs defaultValue="backup" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="backup" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Archive className="h-4 w-4" />
              Backup
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Upload className="h-4 w-4" />
              Import
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Download className="h-4 w-4" />
              Export
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Settings className="h-4 w-4" />
              Maintenance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="backup" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="h-5 w-5 text-blue-600" />
                  Database Backup
                </CardTitle>
                <CardDescription>Create and manage database backups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="font-semibold">Last Backup</div>
                      <div className="text-sm text-gray-600">2024-01-15 08:30</div>
                      <Badge variant="default" className="mt-2">
                        Success
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <HardDrive className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold">Backup Size</div>
                      <div className="text-sm text-gray-600">2.4 GB</div>
                      <Badge variant="outline" className="mt-2">
                        Compressed
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-semibold">Next Scheduled</div>
                      <div className="text-sm text-gray-600">2024-01-16 08:30</div>
                      <Badge variant="secondary" className="mt-2">
                        Automated
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => handleDataOperation("Manual Backup")}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    {isProcessing ? "Creating Backup..." : "Create Backup Now"}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Latest
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="import" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-green-600" />
                  Data Import
                </CardTitle>
                <CardDescription>Import data from external sources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-lg font-medium mb-2">Drop files here or click to browse</div>
                  <div className="text-sm text-gray-600 mb-4">Supported formats: CSV, JSON, XML</div>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Select Files
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Import Options</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Validate data before import
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Skip duplicate records
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Create backup before import
                      </label>
                    </div>
                  </div>
                </div>

                <Button onClick={() => handleDataOperation("Data Import")} disabled={isProcessing} className="w-full">
                  {isProcessing ? "Importing..." : "Start Import"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-purple-600" />
                  Data Export
                </CardTitle>
                <CardDescription>Export system data in various formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Export Type</label>
                      <select className="w-full p-2 border rounded-lg">
                        <option>All Employee Data</option>
                        <option>Engagement Surveys</option>
                        <option>Performance Reviews</option>
                        <option>System Logs</option>
                        <option>Analytics Data</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Format</label>
                      <select className="w-full p-2 border rounded-lg">
                        <option>CSV</option>
                        <option>JSON</option>
                        <option>Excel (XLSX)</option>
                        <option>PDF Report</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Date Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="date" />
                        <Input type="date" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Export Options</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          Include metadata
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Compress output
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Email when complete
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Additional Notes</label>
                      <Textarea placeholder="Add any special instructions..." rows={3} />
                    </div>
                  </div>
                </div>

                <Button onClick={() => handleDataOperation("Data Export")} disabled={isProcessing} className="w-full">
                  {isProcessing ? "Exporting..." : "Start Export"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-orange-600" />
                  Database Maintenance
                </CardTitle>
                <CardDescription>Perform database optimization and cleanup tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Optimization Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDataOperation("Index Optimization")}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Optimize Indexes
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDataOperation("Cache Clear")}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Cache
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDataOperation("Statistics Update")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Update Statistics
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cleanup Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDataOperation("Log Cleanup")}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clean Old Logs
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDataOperation("Temp Files Cleanup")}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Temp Files
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDataOperation("Archive Old Data")}
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archive Old Data
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-yellow-800 dark:text-yellow-200">Maintenance Warning</div>
                        <div className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                          Some maintenance operations may temporarily affect system performance. It's recommended to
                          schedule these during off-peak hours.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
