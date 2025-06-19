"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Star,
  Award,
  BookOpen,
  Edit,
  Save,
  Camera,
  Heart,
  TrendingUp,
  Clock,
} from "lucide-react"

const mockEmployeeData = {
  id: "EMP001",
  name: "John Doe",
  email: "john.doe@company.com",
  phone: "+1 (555) 123-4567",
  department: "Engineering",
  role: "Senior Software Engineer",
  manager: "Sarah Johnson",
  location: "San Francisco, CA",
  joinDate: "2022-01-15",
  employeeId: "ENG-001",
  status: "active",
  avatar: "JD",
  bio: "Passionate software engineer with 5+ years of experience in full-stack development. Love working on challenging problems and mentoring junior developers.",
  skills: ["React", "Node.js", "Python", "AWS", "Docker", "GraphQL"],
  engagementScore: 8.5,
  satisfactionScore: 7.8,
  performanceScore: 9.1,
  wellnessScore: 8.2,
  goals: [
    { title: "Complete React Certification", progress: 75, deadline: "2024-03-15", status: "in-progress" },
    { title: "Lead Team Project", progress: 60, deadline: "2024-04-01", status: "in-progress" },
    { title: "Mentor 2 Junior Developers", progress: 100, deadline: "2024-02-28", status: "completed" },
  ],
  achievements: [
    { title: "Employee of the Month", date: "2024-01-01", type: "recognition" },
    { title: "Innovation Award", date: "2023-12-15", type: "award" },
    { title: "5 Years Service", date: "2023-01-15", type: "milestone" },
  ],
  recentActivity: [
    { action: "Completed survey", date: "2024-02-10", type: "survey" },
    { action: "Updated goals", date: "2024-02-08", type: "goal" },
    { action: "Attended training", date: "2024-02-05", type: "learning" },
  ],
}

export default function ProfilePage() {
  const [employee, setEmployee] = useState(mockEmployeeData)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: employee.name,
    phone: employee.phone,
    location: employee.location,
    bio: employee.bio,
  })
  const { toast } = useToast()

  const handleSave = () => {
    setEmployee((prev) => ({
      ...prev,
      ...editForm,
    }))
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "overdue":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white/20">
                  <AvatarImage src="/avatars/employee.png" alt={employee.name} />
                  <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                    {employee.avatar}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 space-y-2">
                <h1 className="text-3xl font-bold">{employee.name}</h1>
                <p className="text-lg opacity-90">{employee.role}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {employee.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {employee.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {employee.joinDate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-white/20 text-white border-white/30">ID: {employee.employeeId}</Badge>
                  <Badge className="bg-green-500/20 text-white border-green-400/30">Active</Badge>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getScoreColor(employee.engagementScore)}`}>
                {employee.engagementScore}
              </div>
              <Progress value={employee.engagementScore * 10} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getScoreColor(employee.satisfactionScore)}`}>
                {employee.satisfactionScore}
              </div>
              <Progress value={employee.satisfactionScore * 10} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getScoreColor(employee.performanceScore)}`}>
                {employee.performanceScore}
              </div>
              <Progress value={employee.performanceScore * 10} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wellness</CardTitle>
              <Heart className="h-4 w-4 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getScoreColor(employee.wellnessScore)}`}>
                {employee.wellnessScore}
              </div>
              <Progress value={employee.wellnessScore * 10} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editForm.location}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <Button onClick={handleSave} className="w-full">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{employee.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{employee.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>Manager: {employee.manager}</span>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{employee.bio}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="hover-glow">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employee.goals.map((goal, index) => (
                <Card key={index} className="hover-lift">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <Badge variant={getStatusColor(goal.status)}>{goal.status}</Badge>
                    </div>
                    <CardDescription>Due: {goal.deadline}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="space-y-4">
              {employee.achievements.map((achievement, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.date}</p>
                    </div>
                    <Badge variant="outline">{achievement.type}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <div className="space-y-4">
              {employee.recentActivity.map((activity, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{activity.action}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.date}</p>
                    </div>
                    <Badge variant="outline">{activity.type}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
