"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingUp,
  Heart,
  Target,
  ArrowRight,
  Sparkles,
  BarChart3,
  Shield,
  Zap,
  Star,
  CheckCircle,
  Play,
  Award,
  Globe,
  Rocket,
} from "lucide-react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Employee Management",
      description: "Comprehensive employee data management with real-time insights",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "AI-powered analytics for engagement and performance tracking",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Engagement Tracking",
      description: "Monitor employee satisfaction and engagement in real-time",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Predictive Insights",
      description: "Predict turnover risk and identify improvement opportunities",
      color: "from-orange-500 to-red-500",
    },
  ]

  const stats = [
    { label: "Active Users", value: "10,000+", icon: <Users className="h-5 w-5" /> },
    { label: "Engagement Rate", value: "94%", icon: <Heart className="h-5 w-5" /> },
    { label: "Retention Improved", value: "35%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Companies Trust Us", value: "500+", icon: <Award className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IGNITE
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  Employee Login
                </Button>
              </Link>
              <Link href="/admin-login">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2">
                <Rocket className="h-4 w-4 mr-2" />
                AI-Powered Employee Engagement Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Employee Experience
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                IGNITE revolutionizes employee engagement with AI-driven insights, predictive analytics, and
                comprehensive management tools that boost productivity and retention.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Try Live Demo
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/admin-login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    Admin Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-500 delay-${index * 100} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modern Workplaces
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools designed to enhance employee engagement, boost productivity, and create a thriving
              workplace culture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`p-6 cursor-pointer transition-all duration-500 hover:shadow-xl ${
                    currentFeature === index
                      ? "ring-2 ring-blue-500 shadow-lg scale-105"
                      : "hover:shadow-lg hover:scale-102"
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white`}>{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 shadow-2xl">
                <div className="aspect-video bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center justify-center">
                  <div
                    className={`text-center transition-all duration-500 bg-gradient-to-r ${features[currentFeature].color} bg-clip-text text-transparent`}
                  >
                    <div className="text-6xl mb-4">{features[currentFeature].icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{features[currentFeature].title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{features[currentFeature].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Why Choose IGNITE?</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join thousands of companies that have transformed their workplace culture with our comprehensive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Real-time Insights",
                description: "Get instant feedback and analytics on employee engagement and satisfaction levels.",
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Predictive Analytics",
                description: "AI-powered predictions help identify at-risk employees before they leave.",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Global Scale",
                description: "Support for multi-location teams with timezone and language considerations.",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Enterprise Security",
                description: "Bank-level security with SOC 2 compliance and data encryption.",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Easy Integration",
                description: "Seamlessly integrate with your existing HR tools and workflows.",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Proven Results",
                description: "Average 35% improvement in employee retention within 6 months.",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="opacity-90">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Employee Experience?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of companies using IGNITE to build better workplaces and boost employee satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Free Demo
              </Button>
            </Link>
            <Link href="/admin-login">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <Shield className="h-5 w-5 mr-2" />
                Admin Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">IGNITE</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Transforming employee engagement with AI-powered insights and comprehensive management tools for modern
                workplaces.
              </p>
              <div className="flex gap-4">
                <Badge variant="outline" className="text-white border-white/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  SOC 2 Compliant
                </Badge>
                <Badge variant="outline" className="text-white border-white/20">
                  <Shield className="h-3 w-3 mr-1" />
                  Enterprise Ready
                </Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Access</h3>
              <div className="space-y-2">
                <Link href="/login" className="block text-gray-400 hover:text-white transition-colors">
                  Employee Login
                </Link>
                <Link href="/admin-login" className="block text-gray-400 hover:text-white transition-colors">
                  Admin Dashboard
                </Link>
                <Link href="/dashboard" className="block text-gray-400 hover:text-white transition-colors">
                  Live Demo
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <div className="space-y-2">
                <div className="text-gray-400">Employee Management</div>
                <div className="text-gray-400">Analytics Dashboard</div>
                <div className="text-gray-400">Engagement Tracking</div>
                <div className="text-gray-400">Predictive Insights</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 IGNITE Employee Engagement Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
