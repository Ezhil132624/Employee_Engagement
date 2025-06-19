"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp } from "lucide-react"

interface EngagementChartProps {
  data: {
    engagement: number[]
    satisfaction: number[]
    turnover: number[]
  }
}

export function EngagementChart({ data }: EngagementChartProps) {
  const chartData = data.engagement.map((engagement, index) => ({
    month: `Month ${index + 1}`,
    engagement: engagement,
    satisfaction: data.satisfaction[index],
    turnover: data.turnover[index],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Engagement Trends
        </CardTitle>
        <CardDescription>Monthly engagement, satisfaction, and turnover trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            engagement: {
              label: "Engagement",
              color: "hsl(var(--chart-1))",
            },
            satisfaction: {
              label: "Satisfaction",
              color: "hsl(var(--chart-2))",
            },
            turnover: {
              label: "Turnover Risk",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="var(--color-engagement)"
                strokeWidth={2}
                dot={{ fill: "var(--color-engagement)" }}
              />
              <Line
                type="monotone"
                dataKey="satisfaction"
                stroke="var(--color-satisfaction)"
                strokeWidth={2}
                dot={{ fill: "var(--color-satisfaction)" }}
              />
              <Line
                type="monotone"
                dataKey="turnover"
                stroke="var(--color-turnover)"
                strokeWidth={2}
                dot={{ fill: "var(--color-turnover)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
