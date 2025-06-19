"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { Plus, Calendar, CheckCircle, Edit, Trash2, Target } from "lucide-react"

const initialGoals = [
  {
    id: 1,
    title: "Complete React Certification",
    description: "Finish the advanced React certification course",
    progress: 75,
    deadline: "2024-03-15",
    status: "in-progress",
    category: "Learning",
  },
  {
    id: 2,
    title: "Lead Team Project",
    description: "Successfully lead the Q1 product launch project",
    progress: 60,
    deadline: "2024-04-01",
    status: "in-progress",
    category: "Leadership",
  },
  {
    id: 3,
    title: "Mentor Junior Developer",
    description: "Guide and mentor a new team member",
    progress: 100,
    deadline: "2024-02-28",
    status: "completed",
    category: "Mentoring",
  },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "",
  })
  const { toast } = useToast()

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.deadline || !newGoal.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const goal = {
      id: goals.length + 1,
      ...newGoal,
      progress: 0,
      status: "in-progress",
    }

    setGoals([...goals, goal])
    setNewGoal({ title: "", description: "", deadline: "", category: "" })
    setIsCreateOpen(false)

    toast({
      title: "Goal Created",
      description: "Your new goal has been added successfully.",
    })
  }

  const handleEditGoal = (goal) => {
    setEditingGoal(goal)
    setIsEditOpen(true)
  }

  const handleUpdateGoal = () => {
    setGoals(goals.map((g) => (g.id === editingGoal.id ? editingGoal : g)))
    setIsEditOpen(false)
    setEditingGoal(null)

    toast({
      title: "Goal Updated",
      description: "Your goal has been updated successfully.",
    })
  }

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter((g) => g.id !== goalId))
    toast({
      title: "Goal Deleted",
      description: "The goal has been removed.",
    })
  }

  const updateProgress = (goalId, newProgress) => {
    setGoals(
      goals.map((g) =>
        g.id === goalId
          ? { ...g, progress: newProgress, status: newProgress === 100 ? "completed" : "in-progress" }
          : g,
      ),
    )

    toast({
      title: "Progress Updated",
      description: "Goal progress has been updated.",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up dark-mode-transition">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-8 text-white glass-effect">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Goals & Objectives</h1>
                <p className="text-lg opacity-90">Track your professional development goals</p>
              </div>
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-effect">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Create New Goal
                    </DialogTitle>
                    <DialogDescription>
                      Set a new professional development goal to track your progress.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Goal Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter goal title"
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your goal"
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Deadline *</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={newGoal.deadline}
                          onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={newGoal.category}
                          onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Learning">Learning</SelectItem>
                            <SelectItem value="Leadership">Leadership</SelectItem>
                            <SelectItem value="Technical">Technical</SelectItem>
                            <SelectItem value="Skills">Skills</SelectItem>
                            <SelectItem value="Mentoring">Mentoring</SelectItem>
                            <SelectItem value="Personal">Personal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateGoal} className="btn-primary">
                      Create Goal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, index) => (
            <Card
              key={goal.id}
              className="hover-lift dark-mode-transition"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    {goal.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    <Button variant="ghost" size="sm" onClick={() => handleEditGoal(goal)} className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Due: {goal.deadline}
                </CardDescription>
                {goal.description && <p className="text-sm text-gray-600 dark:text-gray-400">{goal.description}</p>}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{goal.category}</Badge>
                    <Badge variant={goal.status === "completed" ? "default" : "secondary"}>{goal.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="progress-bar" />
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateProgress(goal.id, Math.min(100, goal.progress + 10))}
                        disabled={goal.progress >= 100}
                      >
                        +10%
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateProgress(goal.id, Math.max(0, goal.progress - 10))}
                        disabled={goal.progress <= 0}
                      >
                        -10%
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Goal Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="glass-effect">
            <DialogHeader>
              <DialogTitle>Edit Goal</DialogTitle>
              <DialogDescription>Update your goal details and progress.</DialogDescription>
            </DialogHeader>
            {editingGoal && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Goal Title</Label>
                  <Input
                    id="edit-title"
                    value={editingGoal.title}
                    onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingGoal.description}
                    onChange={(e) => setEditingGoal({ ...editingGoal, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-deadline">Deadline</Label>
                    <Input
                      id="edit-deadline"
                      type="date"
                      value={editingGoal.deadline}
                      onChange={(e) => setEditingGoal({ ...editingGoal, deadline: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={editingGoal.category}
                      onValueChange={(value) => setEditingGoal({ ...editingGoal, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Learning">Learning</SelectItem>
                        <SelectItem value="Leadership">Leadership</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="Skills">Skills</SelectItem>
                        <SelectItem value="Mentoring">Mentoring</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateGoal} className="btn-primary">
                Update Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
