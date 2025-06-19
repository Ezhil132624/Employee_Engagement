"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, ThumbsDown, Meh } from "lucide-react"

const sentimentData = {
  overall: {
    positive: 65,
    neutral: 25,
    negative: 10,
  },
  topics: [
    { topic: "Work-Life Balance", sentiment: "positive", score: 78, mentions: 234 },
    { topic: "Management Support", sentiment: "neutral", score: 52, mentions: 189 },
    { topic: "Career Development", sentiment: "positive", score: 71, mentions: 156 },
    { topic: "Compensation", sentiment: "negative", score: 34, mentions: 198 },
    { topic: "Company Culture", sentiment: "positive", score: 82, mentions: 267 },
    { topic: "Workload", sentiment: "negative", score: 28, mentions: 145 },
  ],
  recentFeedback: [
    {
      id: 1,
      text: "Love the flexible work arrangements and supportive team environment.",
      sentiment: "positive",
      department: "Engineering",
    },
    {
      id: 2,
      text: "Career growth opportunities could be better defined and communicated.",
      sentiment: "neutral",
      department: "Marketing",
    },
    {
      id: 3,
      text: "Workload has been overwhelming lately, affecting work-life balance.",
      sentiment: "negative",
      department: "Sales",
    },
    {
      id: 4,
      text: "Great company culture and values alignment with personal beliefs.",
      sentiment: "positive",
      department: "HR",
    },
  ],
}

export function SentimentAnalysis() {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-600" />
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-red-600" />
      default:
        return <Meh className="h-4 w-4 text-yellow-600" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "default"
      case "negative":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Overall Sentiment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Overall Sentiment
          </CardTitle>
          <CardDescription>Employee sentiment analysis from recent feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Positive</span>
              </div>
              <span className="text-sm text-gray-600">{sentimentData.overall.positive}%</span>
            </div>
            <Progress value={sentimentData.overall.positive} className="h-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Meh className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Neutral</span>
              </div>
              <span className="text-sm text-gray-600">{sentimentData.overall.neutral}%</span>
            </div>
            <Progress value={sentimentData.overall.neutral} className="h-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsDown className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Negative</span>
              </div>
              <span className="text-sm text-gray-600">{sentimentData.overall.negative}%</span>
            </div>
            <Progress value={sentimentData.overall.negative} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Topic Sentiment */}
      <Card>
        <CardHeader>
          <CardTitle>Topic Analysis</CardTitle>
          <CardDescription>Sentiment breakdown by key topics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sentimentData.topics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  {getSentimentIcon(topic.sentiment)}
                  <div>
                    <div className="font-medium text-sm">{topic.topic}</div>
                    <div className="text-xs text-gray-500">{topic.mentions} mentions</div>
                  </div>
                </div>
                <Badge variant={getSentimentColor(topic.sentiment)}>{topic.score}%</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>Latest employee feedback with sentiment analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sentimentData.recentFeedback.map((feedback) => (
              <div key={feedback.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getSentimentIcon(feedback.sentiment)}
                    <Badge variant="outline">{feedback.department}</Badge>
                  </div>
                  <Badge variant={getSentimentColor(feedback.sentiment)}>{feedback.sentiment}</Badge>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">"{feedback.text}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
