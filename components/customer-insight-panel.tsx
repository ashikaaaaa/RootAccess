"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Users, TrendingUp, TrendingDown, Tag } from "lucide-react"

const customerData = {
  total: 1248,
  active: 876,
  inactive: 372,
  segments: [
    { name: "Loyal Customers", count: 423, color: "bg-emerald-100 text-emerald-800" },
    { name: "Frequent Buyers", count: 453, color: "bg-blue-100 text-blue-800" },
    { name: "Currently Inactive", count: 372, color: "bg-amber-100 text-amber-800" },
  ],
}

const buyingPatternData = [
  { month: "Jan", purchases: 12 },
  { month: "Feb", purchases: 19 },
  { month: "Mar", purchases: 15 },
  { month: "Apr", purchases: 8 },
  { month: "May", purchases: 5 },
  { month: "Jun", purchases: 3 },
]

export function CustomerInsightPanel() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Customer Insights</CardTitle>
            <CardDescription>Overview of customer segments and activity</CardDescription>
          </div>
          <Users className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-sm text-muted-foreground mb-1">Total Customers</div>
            <div className="text-2xl font-semibold">{customerData.total}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-sm text-muted-foreground mb-1">Active</div>
            <div className="text-2xl font-semibold text-emerald-600">{customerData.active}</div>
            <div className="text-xs text-emerald-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.2% this month
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-sm text-muted-foreground mb-1">Inactive</div>
            <div className="text-2xl font-semibold text-red-600">{customerData.inactive}</div>
            <div className="text-xs text-red-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              +2.1% this month
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Customer Segments</h3>
          <div className="space-y-3">
            {customerData.segments.map((segment) => (
              <div key={segment.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{segment.name}</span>
                </div>
                <Badge variant="secondary" className={segment.color}>
                  {segment.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Buying Pattern (Inactive Users)</h3>
          <Tabs defaultValue="6months">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="6months">6 Months</TabsTrigger>
                <TabsTrigger value="12months">12 Months</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="6months" className="pt-3">
              <ChartContainer className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={buyingPatternData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                    <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(value) => `${value}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="purchases" fill="rgba(99, 102, 241, 0.8)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="12months">
              <div className="h-[180px] flex items-center justify-center text-muted-foreground">
                12-month data loading...
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <ChartTooltip>
      <ChartTooltipContent>
        <div className="font-medium">{payload[0]?.payload?.month || ""}</div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2" />
          <span className="text-muted-foreground">Purchases:</span>
          <span className="font-medium ml-1">{payload[0]?.value || 0}</span>
        </div>
      </ChartTooltipContent>
    </ChartTooltip>
  )
}

