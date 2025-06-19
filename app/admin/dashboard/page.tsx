"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  UserCheck,
  Crown,
  Search,
  Download,
  Plus,
  Edit,
  Star,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  MoreVertical,
  Eye,
  Mail,
  Phone,
  Calendar,
} from "lucide-react"
import { AdminLayout } from "@/components/admin-layout"
import { EmployeeManagement } from "@/components/employee-management"
import { AdvancedAnalytics } from "@/components/advanced-analytics"
import { SystemSettings } from "@/components/system-settings"
import { useToast } from "@/hooks/use-toast"

// Enhanced mock employee data with more realistic information
const mockEmployees = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    role: "Senior Software Engineer",
    status: "active",
    employmentType: "full-time",
    joinDate: "2022-01-15",
    lastActive: "2024-01-15T10:30:00Z",
    engagementScore: 8.5,
    performanceRating: 4.8,
    valueScore: 92,
    isTopPerformer: true,
    skills: ["React", "Node.js", "Python", "AWS", "TypeScript"],
    projects: 12,
    completedTasks: 156,
    avatar: "/avatars/sarah.jpg",
    salary: 95000,
    location: "San Francisco, CA",
    manager: "John Smith",
    teamSize: 8,
    certifications: ["AWS Certified", "React Expert"],
    languages: ["English", "Spanish"],
    workHours: "9:00 AM - 6:00 PM",
    timezone: "PST",
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
    department: "Sales",
    role: "Sales Manager",
    status: "active",
    employmentType: "full-time",
    joinDate: "2021-08-20",
    lastActive: "2024-01-15T09:45:00Z",
    engagementScore: 7.8,
    performanceRating: 4.5,
    valueScore: 88,
    isTopPerformer: true,
    skills: ["Sales Strategy", "CRM", "Negotiation", "Leadership", "Analytics"],
    projects: 8,
    completedTasks: 134,
    avatar: "/avatars/michael.jpg",
    salary: 85000,
    location: "New York, NY",
    manager: "Lisa Williams",
    teamSize: 12,
    certifications: ["Salesforce Certified", "HubSpot Expert"],
    languages: ["English", "Mandarin"],
    workHours: "8:00 AM - 5:00 PM",
    timezone: "EST",
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    department: "Marketing",
    role: "Marketing Specialist",
    status: "active",
    employmentType: "part-time",
    joinDate: "2023-03-10",
    lastActive: "2024-01-15T11:15:00Z",
    engagementScore: 6.2,
    performanceRating: 3.8,
    valueScore: 65,
    isTopPerformer: false,
    skills: ["Digital Marketing", "Content Creation", "SEO", "Analytics", "Social Media"],
    projects: 5,
    completedTasks: 89,
    avatar: "/avatars/emily.jpg",
    salary: 45000,
    location: "Austin, TX",
    manager: "David Park",
    teamSize: 6,
    certifications: ["Google Analytics", "Facebook Blueprint"],
    languages: ["English", "Spanish"],
    workHours: "10:00 AM - 3:00 PM",
    timezone: "CST",
  },
  {
    id: "EMP004",
    name: "David Park",
    email: "david.park@company.com",
    phone: "+1 (555) 456-7890",
    department: "Finance",
    role: "Financial Analyst",
    status: "inactive",
    employmentType: "full-time",
    joinDate: "2020-11-05",
    lastActive: "2024-01-10T16:20:00Z",
    engagementScore: 5.1,
    performanceRating: 3.2,
    valueScore: 45,
    isTopPerformer: false,
    skills: ["Financial Analysis", "Excel", "SQL", "Reporting", "PowerBI"],
    projects: 3,
    completedTasks: 67,
    avatar: "/avatars/david.jpg",
    salary: 70000,
    location: "Chicago, IL",
    manager: "Jennifer Lee",
    teamSize: 4,
    certifications: ["CPA", "Financial Modeling"],
    languages: ["English", "Korean"],
    workHours: "9:00 AM - 6:00 PM",
    timezone: "CST",
  },
  {
    id: "EMP005",
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    phone: "+1 (555) 567-8901",
    department: "HR",
    role: "HR Business Partner",
    status: "active",
    employmentType: "full-time",
    joinDate: "2019-06-12",
    lastActive: "2024-01-15T14:30:00Z",
    engagementScore: 9.2,
    performanceRating: 4.9,
    valueScore: 95,
    isTopPerformer: true,
    skills: ["People Management", "Recruitment", "Employee Relations", "Strategy", "Coaching"],
    projects: 15,
    completedTasks: 203,
    avatar: "/avatars/lisa.jpg",
    salary: 90000,
    location: "Seattle, WA",
    manager: "Robert Johnson",
    teamSize: 10,
    certifications: ["SHRM-CP", "PHR"],
    languages: ["English", "French"],
    workHours: "8:30 AM - 5:30 PM",
    timezone: "PST",
  },
  {
    id: "EMP006",
    name: "Alex Kumar",
    email: "alex.kumar@company.com",
    phone: "+1 (555) 678-9012",
    department: "Engineering",
    role: "DevOps Engineer",
    status: "active",
    employmentType: "full-time",
    joinDate: "2022-09-01",
    lastActive: "2024-01-15T13:45:00Z",
    engagementScore: 8.1,
    performanceRating: 4.6,
    valueScore: 89,
    isTopPerformer: true,
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    projects: 10,
    completedTasks: 142,
    avatar: "/avatars/alex.jpg",
    salary: 105000,
    location: "Remote",
    manager: "Sarah Johnson",
    teamSize: 8,
    certifications: ["AWS DevOps", "Kubernetes Certified"],
    languages: ["English", "Hindi"],
    workHours: "10:00 AM - 7:00 PM",
    timezone: "EST",
  },
]

export default function AdminDashboardPage() {
  const [employees, setEmployees] = useState(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterEmploymentType, setFilterEmploymentType] = useState("all")
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { toast } = useToast()

  // Calculate dashboard metrics with animations
  const totalEmployees = employees.length
  const activeEmployees = employees.filter((emp) => emp.status === "active").length
  const fullTimeEmployees = employees.filter((emp) => emp.employmentType === "full-time").length
  const topPerformers = employees.filter((emp) => emp.isTopPerformer).length
  const avgEngagement = employees.reduce((sum, emp) => sum + emp.engagementScore, 0) / employees.length
  const avgValueScore = employees.reduce((sum, emp) => sum + emp.valueScore, 0) / employees.length
  const avgSalary = employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus
    const matchesEmploymentType = filterEmploymentType === "all" || employee.employmentType === filterEmploymentType

    return matchesSearch && matchesDepartment && matchesStatus && matchesEmploymentType
  })

  // Get unique departments
  const departments = [...new Set(employees.map((emp) => emp.department))]

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => ({
          ...emp,
          engagementScore: Math.max(0, Math.min(10, emp.engagementScore + (Math.random() - 0.5) * 0.2)),
          lastActive: new Date().toISOString(),
        })),
      )
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "inactive":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getValueScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const handleQuickAction = (action: string, employeeId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Action Completed",
        description: `${action} completed successfully for employee ${employeeId}`,
      })
    }, 1000)
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(salary)
  }

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Enhanced Header with Gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-bold animate-fade-in-left">
                  Admin Dashboard
                  <span className="block text-lg font-normal opacity-90 mt-2">
                    Comprehensive employee management and analytics
                  </span>
                </h1>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                  <span>•</span>
                  <span>{filteredEmployees.length} employees shown</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <Button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white btn-animate"
                  onClick={() => handleQuickAction("Add Employee", "new")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-pulse-glow"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24 animate-bounce-gentle"></div>
        </div>

        {/* Enhanced KPI Cards with Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 hover-lift animate-fade-in-up">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Employees</CardTitle>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 animate-scale-pulse">
                {totalEmployees.toLocaleString()}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 hover-lift animate-fade-in-up animation-delay-200">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Active</CardTitle>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100 animate-scale-pulse">
                {activeEmployees}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {Math.round((activeEmployees / totalEmployees) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 hover-lift animate-fade-in-up animation-delay-400">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Full-Time</CardTitle>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 animate-scale-pulse">
                {fullTimeEmployees}
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                {Math.round((fullTimeEmployees / totalEmployees) * 100)}% full-time
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800 hover-lift animate-fade-in-up animation-delay-600">
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Top Performers</CardTitle>
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100 animate-scale-pulse">
                {topPerformers}
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">High value employees</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-teal-200 dark:border-teal-800 hover-lift animate-fade-in-up animation-delay-800">
            <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-teal-700 dark:text-teal-300">Avg Engagement</CardTitle>
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <TrendingUp className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-900 dark:text-teal-100 animate-scale-pulse">
                {avgEngagement.toFixed(1)}
              </div>
              <p className="text-xs text-teal-600 dark:text-teal-400 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +0.3 this month
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800 hover-lift animate-fade-in-up animation-delay-1000">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Avg Value Score
              </CardTitle>
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Star className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100 animate-scale-pulse">
                {avgValueScore.toFixed(0)}
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Employee value index</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="glass hover-lift animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Advanced Search & Filters
            </CardTitle>
            <CardDescription>Find and filter employees with powerful search capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 focus-ring"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="focus-ring">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="focus-ring">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Employment Type</label>
                <Select value={filterEmploymentType} onValueChange={setFilterEmploymentType}>
                  <SelectTrigger className="focus-ring">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">View Mode</label>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="flex-1"
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="flex-1"
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredEmployees.length} of {totalEmployees} employees
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 lg:w-auto bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="employees" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Employees</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-white">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Management</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-white">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-6">
            {/* Employee List */}
            <Card className="hover-lift animate-fade-in-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Employee Directory ({filteredEmployees.length})
                    </CardTitle>
                    <CardDescription>Manage and monitor all employees with enhanced details</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="animate-pulse">
                      Live Updates
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmployees.map((employee, index) => (
                      <Card
                        key={employee.id}
                        className="relative overflow-hidden hover-lift card-hover animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold animate-scale-pulse">
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                {employee.isTopPerformer && (
                                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                                    <Crown className="h-3 w-3 text-white" />
                                  </div>
                                )}
                                <div
                                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                    employee.status === "active" ? "bg-green-500" : "bg-red-500"
                                  }`}
                                ></div>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white">{employee.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{employee.role}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {employee.department}
                                  </Badge>
                                  <Badge variant={getStatusColor(employee.status)} className="text-xs">
                                    {employee.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                {employee.engagementScore.toFixed(1)}
                              </div>
                              <div className="text-xs text-gray-500">Engagement</div>
                            </div>
                            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                                {employee.performanceRating.toFixed(1)}
                              </div>
                              <div className="text-xs text-gray-500">Performance</div>
                            </div>
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                              <div className={`text-sm font-medium ${getValueScoreColor(employee.valueScore)}`}>
                                {employee.valueScore}
                              </div>
                              <div className="text-xs text-gray-500">Value</div>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400 truncate">{employee.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">{employee.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">
                                {formatLastActive(employee.lastActive)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t">
                            <Button size="sm" variant="outline" className="flex-1 btn-animate">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 btn-animate">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEmployees.map((employee, index) => (
                      <Card
                        key={employee.id}
                        className="hover-lift card-hover animate-fade-in-left"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                {employee.isTopPerformer && (
                                  <Crown className="absolute -top-1 -right-1 h-5 w-5 text-yellow-500 animate-bounce-gentle" />
                                )}
                                <div
                                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                                    employee.status === "active" ? "bg-green-500" : "bg-red-500"
                                  }`}
                                ></div>
                              </div>
                              <div className="flex-1 space-y-2">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {employee.name}
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-400">{employee.role}</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <Badge variant="outline">{employee.department}</Badge>
                                  <Badge variant={getStatusColor(employee.status)}>
                                    {getStatusIcon(employee.status)}
                                    <span className="ml-1">{employee.status}</span>
                                  </Badge>
                                  <Badge variant="secondary">{employee.employmentType}</Badge>
                                  <Badge variant="outline">{employee.location}</Badge>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">Email:</span>
                                    <p className="font-medium truncate">{employee.email}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Salary:</span>
                                    <p className="font-medium">{formatSalary(employee.salary)}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Team Size:</span>
                                    <p className="font-medium">{employee.teamSize} members</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Last Active:</span>
                                    <p className="font-medium">{formatLastActive(employee.lastActive)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                                    {employee.engagementScore.toFixed(1)}
                                  </div>
                                  <div className="text-xs text-gray-500">Engagement</div>
                                </div>
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                  <div className="text-lg font-bold text-green-700 dark:text-green-300">
                                    {employee.performanceRating.toFixed(1)}
                                  </div>
                                  <div className="text-xs text-gray-500">Performance</div>
                                </div>
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                  <div className={`text-lg font-bold ${getValueScoreColor(employee.valueScore)}`}>
                                    {employee.valueScore}
                                  </div>
                                  <div className="text-xs text-gray-500">Value</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" className="btn-animate">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button size="sm" variant="outline" className="btn-animate">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AdvancedAnalytics employees={employees} />
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <EmployeeManagement employees={employees} setEmployees={setEmployees} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
