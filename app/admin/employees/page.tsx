"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminLayout } from "@/components/admin-layout"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Crown,
  Filter,
  Download,
  Upload,
} from "lucide-react"

const mockEmployees = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    role: "Senior Software Engineer",
    status: "active",
    location: "San Francisco, CA",
    joinDate: "2022-01-15",
    salary: 95000,
    isTopPerformer: true,
    engagementScore: 8.5,
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
    department: "Sales",
    role: "Sales Manager",
    status: "active",
    location: "New York, NY",
    joinDate: "2021-08-20",
    salary: 85000,
    isTopPerformer: true,
    engagementScore: 7.8,
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    department: "Marketing",
    role: "Marketing Specialist",
    status: "active",
    location: "Austin, TX",
    joinDate: "2023-03-10",
    salary: 65000,
    isTopPerformer: false,
    engagementScore: 6.2,
  },
]

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const { toast } = useToast()

  const departments = [...new Set(employees.map((emp) => emp.department))]

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleAction = (action: string, employeeId: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} completed for employee ${employeeId}`,
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-bold animate-fade-in-left">
                  Employee Management
                  <span className="block text-lg font-normal opacity-90 mt-2">
                    Comprehensive employee directory and management tools
                  </span>
                </h1>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span>{filteredEmployees.length} employees</span>
                  <span>•</span>
                  <span>{employees.filter((emp) => emp.isTopPerformer).length} top performers</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
                  onClick={() => {
                    // Add employee functionality - this should open a dialog or navigate
                    toast({
                      title: "Add Employee",
                      description: "Add employee functionality will be implemented here",
                    })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                  onClick={() => {
                    // Import CSV functionality
                    toast({
                      title: "Import CSV",
                      description: "CSV import functionality will be implemented here",
                    })
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger>
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
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee, index) => (
            <Card
              key={employee.id}
              className="hover-lift card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      {employee.isTopPerformer && (
                        <Crown className="absolute -top-1 -right-1 h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{employee.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{employee.role}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{employee.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Joined {employee.joinDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant={employee.status === "active" ? "default" : "secondary"}>{employee.status}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-sm font-medium">{employee.engagementScore}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleAction("View", employee.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleAction("Edit", employee.id)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction("Delete", employee.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
