"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Clock, CheckCircle, Send, Star } from "lucide-react"

const initialSurveys = [
  {
    id: 1,
    title: "Quarterly Engagement Survey",
    deadline: "2024-02-28",
    status: "pending",
    urgent: true,
    questions: 15,
    type: "engagement",
  },
  {
    id: 2,
    title: "Team Collaboration Feedback",
    deadline: "2024-03-15",
    status: "pending",
    urgent: false,
    questions: 8,
    type: "feedback",
  },
  {
    id: 3,
    title: "Annual Performance Review",
    deadline: "Completed",
    status: "completed",
    urgent: false,
    questions: 20,
    type: "performance",
  },
]

export default function SurveysPage() {
  const [surveys, setSurveys] = useState(initialSurveys)
  const [isTakingOpen, setIsTakingOpen] = useState(false)
  const [selectedSurvey, setSelectedSurvey] = useState(null)
  const [surveyResponses, setSurveyResponses] = useState({})
  const { toast } = useToast()

  const takeSurvey = (survey) => {
    setSelectedSurvey(survey)
    setIsTakingOpen(true)
  }

  const submitSurvey = () => {
    setSurveys(
      surveys.map((s) => (s.id === selectedSurvey.id ? { ...s, status: "completed", deadline: "Completed" } : s)),
    )
    setIsTakingOpen(false)
    setSurveyResponses({})

    toast({
      title: "Survey Submitted",
      description: "Thank you for your feedback!",
    })
  }

  const handleResponseChange = (questionId, value) => {
    setSurveyResponses({
      ...surveyResponses,
      [questionId]: value,
    })
  }

  const sampleQuestions = [
    { id: 1, text: "How satisfied are you with your current role?", type: "rating" },
    { id: 2, text: "What aspects of your job do you enjoy most?", type: "text" },
    { id: 3, text: "How would you rate team collaboration?", type: "rating" },
    {
      id: 4,
      text: "Which areas need improvement?",
      type: "multiple",
      options: ["Communication", "Resources", "Training", "Work-life balance"],
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up dark-mode-transition">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 text-white glass-effect">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Surveys & Feedback</h1>
            <p className="text-lg opacity-90">Share your thoughts and help improve our workplace</p>
          </div>
        </div>

        {/* Survey Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-lift dark-mode-transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{surveys.filter((s) => s.status === "completed").length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">This year</p>
            </CardContent>
          </Card>

          <Card className="hover-lift dark-mode-transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{surveys.filter((s) => s.status === "pending").length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Due soon</p>
            </CardContent>
          </Card>

          <Card className="hover-lift dark-mode-transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Above average</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Surveys */}
        <Card className="hover-lift dark-mode-transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Available Surveys
            </CardTitle>
            <CardDescription>Complete these surveys to share your feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {surveys.map((survey, index) => (
                <div
                  key={survey.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover-lift"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{survey.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span>Due: {survey.deadline}</span>
                        <span>{survey.questions} questions</span>
                        <Badge variant="outline">{survey.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {survey.urgent && <Badge variant="destructive">Urgent</Badge>}
                    <Badge variant={survey.status === "completed" ? "default" : "secondary"}>{survey.status}</Badge>
                    {survey.status === "pending" && (
                      <Button size="sm" onClick={() => takeSurvey(survey)} className="btn-primary">
                        Take Survey
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Survey Taking Dialog */}
        <Dialog open={isTakingOpen} onOpenChange={setIsTakingOpen}>
          <DialogContent className="glass-effect max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {selectedSurvey?.title}
              </DialogTitle>
              <DialogDescription>
                Please answer all questions honestly. Your feedback helps us improve.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {sampleQuestions.map((question, index) => (
                <div key={question.id} className="space-y-3">
                  <Label className="text-base font-medium">
                    {index + 1}. {question.text}
                  </Label>

                  {question.type === "rating" && (
                    <RadioGroup
                      value={surveyResponses[question.id] || ""}
                      onValueChange={(value) => handleResponseChange(question.id, value)}
                    >
                      <div className="flex items-center space-x-4">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <div key={rating} className="flex items-center space-x-2">
                            <RadioGroupItem value={rating.toString()} id={`q${question.id}-${rating}`} />
                            <Label htmlFor={`q${question.id}-${rating}`} className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              {rating}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}

                  {question.type === "text" && (
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={surveyResponses[question.id] || ""}
                      onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    />
                  )}

                  {question.type === "multiple" && (
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`q${question.id}-${option}`}
                            checked={(surveyResponses[question.id] || []).includes(option)}
                            onCheckedChange={(checked) => {
                              const current = surveyResponses[question.id] || []
                              const updated = checked ? [...current, option] : current.filter((item) => item !== option)
                              handleResponseChange(question.id, updated)
                            }}
                          />
                          <Label htmlFor={`q${question.id}-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTakingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitSurvey} className="btn-primary">
                <Send className="h-4 w-4 mr-2" />
                Submit Survey
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
