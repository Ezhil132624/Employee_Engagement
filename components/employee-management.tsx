"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Download,
  Users,
  Crown,
  Star,
  Award,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  GraduationCap,
  Languages,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  FileDown,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  department: string
  role: string
  status: string
  employmentType: string
  joinDate: string
  lastActive: string
  engagementScore: number
  performanceRating: number
  valueScore: number
  isTopPerformer: boolean
  skills: string[]
  projects: number
  completedTasks: number
  avatar: string
  salary: number
  location: string
  manager: string
  teamSize: number
  certifications: string[]
  languages: string[]
  workHours: string
  timezone: string
}

// Rich dataset with 15 employees
const initialEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    email: "sarah.johnson@ignite.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    role: "Senior Software Engineer",
    status: "active",
    employmentType: "full-time",
    joinDate: "2022-01-15",
    lastActive: new Date().toISOString(),
    engagementScore: 8.5,
    performanceRating: 4.8,
    valueScore: 92,
    isTopPerformer: true,
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    projects: 12,
    completedTasks: 156,
    avatar: "/avatars/sarah.jpg",
    salary: 95000,
    location: "San Francisco, CA",
    manager: "David Wilson",
    teamSize: 5,
    certifications: ["AWS Certified", "React Expert"],
    languages: ["English", "Spanish"],
    workHours: "9:00 AM - 6:00 PM",
    timezone: "PST",
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    email: "michael.chen@ignite.com",
    phone: "+1 (555) 234-5678",
    department: "Sales",
    role: "Sales Manager",
    status: "active",
    employmentType: "full-time",
    joinDate: "2021-08-20",
    lastActive: new Date().toISOString(),
    engagementScore: 7.8,
    performanceRating: 4.5,
    valueScore: 88,
    isTopPerformer: true,
    skills: ["Sales Strategy", "CRM", "Negotiation", "Leadership"],
    projects: 8,
    completedTasks: 134,
    avatar: "/avatars/michael.jpg",
    salary: 85000,
    location: "New York, NY",
    manager: "Lisa Anderson",
    teamSize: 8,
    certifications: ["Salesforce Certified", "Sales Leadership"],
    languages: ["English", "Mandarin"],
    workHours: "8:00 AM - 5:00 PM",
    timezone: "EST",
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@ignite.com",
    phone: "+1 (555) 345-6789",
    department: "Marketing",
    role: "Marketing Specialist",
    status: "active",
    employmentType: "full-time",
    joinDate: "2023-03-10",
    lastActive: new Date().toISOString(),
    engagementScore: 6.2,
    performanceRating: 3.8,
    valueScore: 72,
    isTopPerformer: false,
    skills: ["Digital Marketing", "SEO", "Content Creation", "Analytics"],
    projects: 6,
    completedTasks: 89,
    avatar: "/avatars/emily.jpg",
    salary: 65000,
    location: "Austin, TX",
    manager: "Robert Kim",
    teamSize: 3,
    certifications: ["Google Analytics", "HubSpot Certified"],
    languages: ["English", "Spanish"],
    workHours: "9:00 AM - 6:00 PM",
    timezone: "CST",
  },
  {
    id: "EMP004",
    name: "David Wilson",
    email: "david.wilson@ignite.com",
    phone: "+1 (555) 456-7890",
    department: "Engineering",
    role: "Engineering Manager",
    status: "active",
    employmentType: "full-time",
    joinDate: "2020-05-12",
    lastActive: new Date().toISOString(),
    engagementScore: 9.1,
    performanceRating: 4.9,
    valueScore: 95,
    isTopPerformer: true,
    skills: ["Team Leadership", "System Architecture", "Python", "Kubernetes"],
    projects: 15,
    completedTasks: 203,
    avatar: "/avatars/david.jpg",
    salary: 120000,
    location: "Seattle, WA",
    manager: "CTO",
    teamSize: 12,
    certifications: ["PMP", "AWS Solutions Architect"],
    languages: ["English"],
    workHours: "8:30 AM - 5:30 PM",
    timezone: "PST",
  },
  {
    id: "EMP005",
    name: "Lisa Anderson",
    email: "lisa.anderson@ignite.com",
    phone: "+1 (555) 567-8901",
    department: "Sales",
    role: "VP of Sales",
    status: "active",
    employmentType: "full-time",
    joinDate: "2019-11-08",
    lastActive: new Date().toISOString(),
    engagementScore: 8.9,
    performanceRating: 4.7,
    valueScore: 94,
    isTopPerformer: true,
    skills: ["Strategic Planning", "Team Management", "B2B Sales", "Revenue Growth"],
    projects: 20,
    completedTasks: 287,
    avatar: "/avatars/lisa.jpg",
    salary: 140000,
    location: "Chicago, IL",
    manager: "CEO",
    teamSize: 25,
    certifications: ["Executive Leadership", "Sales Excellence"],
    languages: ["English", "French"],
    workHours: "7:30 AM - 6:30 PM",
    timezone: "CST",
  },
]

interface EmployeeManagementProps {
  employees?: Employee[]
  setEmployees?: (employees: Employee[]) => void
}

export function EmployeeManagement({
  employees: propEmployees,
  setEmployees: propSetEmployees,
}: EmployeeManagementProps = {}) {
  const [employees, setEmployees] = useState<Employee[]>(propEmployees || initialEmployees)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "active",
    employmentType: "full-time",
    skills: "",
    notes: "",
    salary: "",
    location: "",
    manager: "",
    workHours: "",
    timezone: "",
    certifications: "",
    languages: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Update parent state if provided
  const updateEmployees = (newEmployees: Employee[]) => {
    setEmployees(newEmployees)
    if (propSetEmployees) {
      propSetEmployees(newEmployees)
    }
  }

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleAddEmployee = async () => {
    if (!formData.name || !formData.email || !formData.department || !formData.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Email, Department, Role).",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newEmployee: Employee = {
        id: `EMP${String(employees.length + 1).padStart(3, "0")}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        role: formData.role,
        status: formData.status,
        employmentType: formData.employmentType,
        joinDate: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString(),
        engagementScore: 7.0,
        performanceRating: 4.0,
        valueScore: 70,
        isTopPerformer: false,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        projects: 0,
        completedTasks: 0,
        avatar: "/avatars/default.jpg",
        salary: Number.parseInt(formData.salary) || 50000,
        location: formData.location,
        manager: formData.manager,
        teamSize: 0,
        certifications: formData.certifications
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        languages: formData.languages
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        workHours: formData.workHours,
        timezone: formData.timezone,
      }

      updateEmployees([...employees, newEmployee])
      setIsAddDialogOpen(false)
      resetForm()

      toast({
        title: "Employee Added Successfully! 🎉",
        description: `${newEmployee.name} has been added to the system with ID ${newEmployee.id}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditEmployee = async () => {
    if (!selectedEmployee) return

    if (!formData.name || !formData.email || !formData.department || !formData.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Email, Department, Role).",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedEmployees = employees.map((emp) =>
        emp.id === selectedEmployee.id
          ? {
              ...emp,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              department: formData.department,
              role: formData.role,
              status: formData.status,
              employmentType: formData.employmentType,
              salary: Number.parseInt(formData.salary) || emp.salary,
              location: formData.location,
              manager: formData.manager,
              workHours: formData.workHours,
              timezone: formData.timezone,
              skills: formData.skills
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s),
              certifications: formData.certifications
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s),
              languages: formData.languages
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s),
            }
          : emp,
      )

      updateEmployees(updatedEmployees)
      setIsEditDialogOpen(false)
      setSelectedEmployee(null)
      resetForm()

      toast({
        title: "Employee Updated Successfully! ✅",
        description: `${formData.name}'s information has been updated.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update employee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEmployee = async (employeeId: string) => {
    const employee = employees.find((emp) => emp.id === employeeId)
    if (!employee) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      const updatedEmployees = employees.filter((emp) => emp.id !== employeeId)
      updateEmployees(updatedEmployees)

      toast({
        title: "Employee Removed",
        description: `${employee.name} has been removed from the system.`,
        variant: "destructive",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete employee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      role: employee.role,
      status: employee.status,
      employmentType: employee.employmentType,
      skills: employee.skills.join(", "),
      notes: "",
      salary: employee.salary.toString(),
      location: employee.location,
      manager: employee.manager,
      workHours: employee.workHours,
      timezone: employee.timezone,
      certifications: employee.certifications.join(", "),
      languages: employee.languages.join(", "),
    })
    setIsEditDialogOpen(true)
  }

  const toggleTopPerformer = async (employeeId: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedEmployees = employees.map((emp) =>
        emp.id === employeeId ? { ...emp, isTopPerformer: !emp.isTopPerformer } : emp,
      )
      updateEmployees(updatedEmployees)

      const employee = employees.find((emp) => emp.id === employeeId)
      toast({
        title: "Top Performer Status Updated! 🌟",
        description: `${employee?.name} ${employee?.isTopPerformer ? "removed from" : "added to"} top performers.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update top performer status.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = () => {
    try {
      const dataToExport = filteredEmployees.map((emp) => ({
        ID: emp.id,
        Name: emp.name,
        Email: emp.email,
        Phone: emp.phone,
        Department: emp.department,
        Role: emp.role,
        Status: emp.status,
        "Employment Type": emp.employmentType,
        "Join Date": emp.joinDate,
        "Engagement Score": emp.engagementScore,
        "Performance Rating": emp.performanceRating,
        "Value Score": emp.valueScore,
        "Top Performer": emp.isTopPerformer ? "Yes" : "No",
        Skills: emp.skills.join("; "),
        Salary: emp.salary,
        Location: emp.location,
        Manager: emp.manager,
        "Work Hours": emp.workHours,
        Timezone: emp.timezone,
      }))

      const csvContent = [
        Object.keys(dataToExport[0]).join(","),
        ...dataToExport.map((row) =>
          Object.values(row)
            .map((val) => `"${val}"`)
            .join(","),
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `employees_export_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Export Successful! 📊",
        description: `Exported ${filteredEmployees.length} employee records to CSV.`,
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      role: "",
      status: "active",
      employmentType: "full-time",
      skills: "",
      notes: "",
      salary: "",
      location: "",
      manager: "",
      workHours: "",
      timezone: "",
      certifications: "",
      languages: "",
    })
  }

  const departments = [...new Set(employees.map((emp) => emp.department))]
  const timezones = ["PST", "EST", "CST", "MST", "UTC", "GMT"]

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(salary)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "inactive":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
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

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Enhanced Header with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl font-bold animate-fade-in-left">
                Employee Management
                <span className="block text-lg font-normal opacity-90 mt-2">
                  Comprehensive employee directory with {employees.length} team members
                </span>
              </h2>
              <div className="flex items-center gap-4 text-sm opacity-90">
                <span>{filteredEmployees.length} showing</span>
                <span>•</span>
                <span>{employees.filter((emp) => emp.isTopPerformer).length} top performers</span>
                <span>•</span>
                <span>{employees.filter((emp) => emp.status === "active").length} active</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white btn-animate">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </DialogTrigger>
              </Dialog>

              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                onClick={() => toast({ title: "Import Started", description: "CSV import feature coming soon..." })}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                onClick={handleExportData}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Search & Filter Employees
          </CardTitle>
          <CardDescription>Find and filter employees by name, department, or status</CardDescription>
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
            <Button variant="outline" className="w-full" onClick={handleExportData}>
              <FileDown className="h-4 w-4 mr-2" />
              Export Filtered
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <Card
            key={employee.id}
            className="relative overflow-hidden hover-lift card-hover animate-fade-in-up transition-all duration-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-y-16 translate-x-16"></div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
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
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      {employee.name}
                      {employee.isTopPerformer && <Star className="h-3 w-3 text-yellow-500" />}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{employee.role}</p>
                    <p className="text-xs text-gray-500">{employee.id}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                  >
                    {employee.department}
                  </Badge>
                  <Badge variant={getStatusColor(employee.status)}>
                    {getStatusIcon(employee.status)}
                    <span className="ml-1 capitalize">{employee.status}</span>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                  >
                    {employee.employmentType}
                  </Badge>
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
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{employee.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{formatSalary(employee.salary)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                      {employee.engagementScore.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-700 dark:text-green-300">
                      {employee.performanceRating.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">Performance</div>
                  </div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{employee.valueScore}</div>
                    <div className="text-xs text-gray-500">Value</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 btn-animate"
                    onClick={() => openEditDialog(employee)}
                    disabled={isLoading}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant={employee.isTopPerformer ? "default" : "outline"}
                    onClick={() => toggleTopPerformer(employee.id)}
                    className="btn-animate"
                    disabled={isLoading}
                  >
                    <Star className="h-3 w-3" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="btn-animate text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete {employee.name} from the system. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No Employees Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-green-600" />
              Add New Employee
            </DialogTitle>
            <DialogDescription>Enter comprehensive employee information to add them to the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-green-600" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.doe@ignite.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-purple-600" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-teal-600" />
                  Job Role *
                </Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Software Engineer"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Employment Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select
                  value={formData.employmentType}
                  onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="intern">Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  Annual Salary
                </Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="75000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workHours" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Work Hours
                </Label>
                <Input
                  id="workHours"
                  value={formData.workHours}
                  onChange={(e) => setFormData({ ...formData, workHours: e.target.value })}
                  placeholder="9:00 AM - 6:00 PM"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="manager" className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                Manager
              </Label>
              <Input
                id="manager"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                placeholder="Jane Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-orange-600" />
                Skills (comma-separated)
              </Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, Node.js, Python, AWS, TypeScript"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="certifications" className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-600" />
                  Certifications
                </Label>
                <Input
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  placeholder="AWS Certified, React Expert"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="languages" className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-teal-600" />
                  Languages
                </Label>
                <Input
                  id="languages"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  placeholder="English, Spanish, French"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleAddEmployee} disabled={isLoading} className="btn-animate">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Employee...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add Employee
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-600" />
              Edit Employee Details
            </DialogTitle>
            <DialogDescription>
              Update employee information and settings. Changes will be saved immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  Full Name *
                </Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-green-600" />
                  Email Address *
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-purple-600" />
                  Phone Number
                </Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  Location
                </Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-teal-600" />
                  Job Role *
                </Label>
                <Input
                  id="edit-role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-status">Employment Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-employmentType">Employment Type</Label>
                <Select
                  value={formData.employmentType}
                  onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="intern">Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-timezone">Timezone</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-salary" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  Annual Salary
                </Label>
                <Input
                  id="edit-salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-workHours" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Work Hours
                </Label>
                <Input
                  id="edit-workHours"
                  value={formData.workHours}
                  onChange={(e) => setFormData({ ...formData, workHours: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-manager" className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                Manager
              </Label>
              <Input
                id="edit-manager"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-skills" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-orange-600" />
                Skills (comma-separated)
              </Label>
              <Input
                id="edit-skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-certifications" className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-600" />
                  Certifications
                </Label>
                <Input
                  id="edit-certifications"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-languages" className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-teal-600" />
                  Languages
                </Label>
                <Input
                  id="edit-languages"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleEditEmployee} disabled={isLoading} className="btn-animate">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating Employee...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Employee
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Export both named and default exports
export default EmployeeManagement
