"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

const salesData = {
  revenue: 128750,
  growth: 12.5,
  topProducts: [
    {
      id: 1,
      name: "Premium CRM Suite",
      sales: 124,
      trend: "up",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Analytics Dashboard",
      sales: 98,
      trend: "up",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Customer Support Module",
      sales: 76,
      trend: "down",
      image: "/placeholder.svg?height=40&width=40",
    },
  ],
}

const revenueData = [
  { week: "Week 1", revenue: 18500 },
  { week: "Week 2", revenue: 22000 },
  { week: "Week 3", revenue: 21000 },
  { week: "Week 4", revenue: 25500 },
  { week: "Week 5", revenue: 24000 },
  { week: "Week 6", revenue: 29000 },
]

export function SalesAnalyticsPanel() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Sales Analytics</CardTitle>
            <CardDescription>Revenue and top-selling products</CardDescription>
          </div>
          <DollarSign className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg p-4 border border-slate-200 mb-6">
          <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
          <div className="flex items-baseline">
            <div className="text-3xl font-bold">${salesData.revenue.toLocaleString('en-US')}</div>
            <Badge variant="outline" className="ml-2 bg-emerald-50 text-emerald-700 border-emerald-200">
              <TrendingUp className="h-3 w-3 mr-1" />
              {salesData.growth}%
            </Badge>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Top-Selling Products</h3>
          <div className="space-y-3">
            {salesData.topProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-10 h-10 rounded-md mr-3 bg-slate-100 object-cover"
                  />
                  <div>
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.sales} sales</div>
                  </div>
                </div>
                {product.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Sales Trend</h3>
          <Tabs defaultValue="weekly">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="weekly" className="pt-3">
              <ChartContainer className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <XAxis dataKey="week" axisLine={false} tickLine={false} fontSize={12} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      fontSize={12}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip content={<RevenueTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      dot={{ r: 3, fill: "#4f46e5" }}
                      activeDot={{ r: 5, fill: "#4f46e5" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="monthly">
              <div className="h-[180px] flex items-center justify-center text-muted-foreground">
                Monthly data loading...
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <ChartTooltip>
      <ChartTooltipContent>
        <div className="font-medium">{label || ""}</div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2" />
          <span className="text-muted-foreground">Revenue:</span>
          <span className="font-medium ml-1">${(payload[0]?.value || 0).toLocaleString()}</span>
        </div>
      </ChartTooltipContent>
    </ChartTooltip>
  )
}

