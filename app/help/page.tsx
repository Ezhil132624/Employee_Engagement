"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard-layout"
import { HelpCircle, MessageSquare, Book, Mail } from "lucide-react"

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 via-green-600 to-blue-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
            <p className="text-lg opacity-90">Get assistance and find answers to your questions</p>
          </div>
        </div>

        {/* Help Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-blue-500" />
                Knowledge Base
              </CardTitle>
              <CardDescription>Browse our comprehensive help articles</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Browse Articles</Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
                Live Chat
              </CardTitle>
              <CardDescription>Chat with our support team in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-purple-500" />
                Email Support
              </CardTitle>
              <CardDescription>Send us an email for detailed assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Send Email</Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  question: "How do I update my profile?",
                  answer: "Go to Profile page and click Edit Profile button.",
                },
                {
                  question: "How do I complete surveys?",
                  answer: "Visit the Surveys page and click on any pending survey.",
                },
                { question: "How do I set goals?", answer: "Navigate to Goals page and click Add Goal button." },
                {
                  question: "How do I access learning materials?",
                  answer: "Check the Learning page for available courses.",
                },
              ].map((faq, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
