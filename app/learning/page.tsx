"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, Play, Clock, Award, Plus, Star, Users } from "lucide-react"

const initialCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    progress: 75,
    duration: "8 hours",
    category: "Technical",
    enrolled: true,
    rating: 4.8,
    students: 1250,
  },
  {
    id: 2,
    title: "Leadership Fundamentals",
    progress: 40,
    duration: "12 hours",
    category: "Leadership",
    enrolled: true,
    rating: 4.6,
    students: 890,
  },
  {
    id: 3,
    title: "Data Analysis with Python",
    progress: 90,
    duration: "15 hours",
    category: "Technical",
    enrolled: true,
    rating: 4.9,
    students: 2100,
  },
]

const availableCourses = [
  {
    id: 4,
    title: "UI/UX Design Principles",
    duration: "10 hours",
    category: "Design",
    rating: 4.7,
    students: 1500,
    description: "Learn modern design principles and user experience best practices.",
  },
  {
    id: 5,
    title: "Project Management Essentials",
    duration: "14 hours",
    category: "Management",
    rating: 4.5,
    students: 980,
    description: "Master project management methodologies and tools.",
  },
  {
    id: 6,
    title: "Machine Learning Basics",
    duration: "20 hours",
    category: "Technical",
    rating: 4.8,
    students: 1800,
    description: "Introduction to machine learning concepts and applications.",
  },
]

export default function LearningPage() {
  const [courses, setCourses] = useState(initialCourses)
  const [available, setAvailable] = useState(availableCourses)
  const [isEnrollOpen, setIsEnrollOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { toast } = useToast()

  const enrollInCourse = (course) => {
    const newCourse = { ...course, progress: 0, enrolled: true }
    setCourses([...courses, newCourse])
    setAvailable(available.filter((c) => c.id !== course.id))
    setIsEnrollOpen(false)

    toast({
      title: "Enrolled Successfully",
      description: `You've been enrolled in ${course.title}`,
    })
  }

  const updateProgress = (courseId, newProgress) => {
    setCourses(courses.map((c) => (c.id === courseId ? { ...c, progress: newProgress } : c)))

    toast({
      title: "Progress Updated",
      description: "Course progress has been updated.",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up dark-mode-transition">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white glass-effect">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Learning & Development</h1>
                <p className="text-lg opacity-90">Enhance your skills with our learning resources</p>
              </div>
              <Dialog open={isEnrollOpen} onOpenChange={setIsEnrollOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-effect max-w-4xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Available Courses
                    </DialogTitle>
                    <DialogDescription>Explore and enroll in new courses to expand your skills.</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {available.map((course) => (
                      <Card key={course.id} className="hover-lift">
                        <CardHeader>
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <Badge variant="outline">{course.category}</Badge>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {course.duration}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                {course.rating}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {course.students} students
                              </span>
                            </div>
                            <Button onClick={() => enrollInCourse(course)} className="w-full btn-primary">
                              Enroll Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover-lift dark-mode-transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.filter((c) => c.progress === 100).length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">This year</p>
            </CardContent>
          </Card>

          <Card className="hover-lift dark-mode-transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">This month</p>
            </CardContent>
          </Card>

          <Card className="hover-lift dark-mode-transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Award className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Earned</p>
            </CardContent>
          </Card>

          <Card className="hover-lift dark-mode-transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Play className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courses.filter((c) => c.progress > 0 && c.progress < 100).length}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Courses</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Courses */}
        <Card className="hover-lift dark-mode-transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              My Courses
            </CardTitle>
            <CardDescription>Continue your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover-lift"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{course.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span>{course.duration}</span>
                        <Badge variant="outline">{course.category}</Badge>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {course.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={course.progress} className="flex-1 progress-bar" />
                        <span className="text-sm">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateProgress(course.id, Math.min(100, course.progress + 10))}
                      disabled={course.progress >= 100}
                    >
                      +10%
                    </Button>
                    <Button size="sm" className="btn-primary">
                      {course.progress === 100 ? "Review" : "Continue"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
