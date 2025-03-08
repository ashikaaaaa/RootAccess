"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Mail, Tag, User } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const churnData = {
  score: 68,
  highRiskCustomers: [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      lastPurchase: "45 days ago",
      purchaseCount: 12,
      riskScore: 85,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@example.com",
      lastPurchase: "38 days ago",
      purchaseCount: 8,
      riskScore: 78,
    },
    {
      id: 3,
      name: "Emma Williams",
      email: "emma.w@example.com",
      lastPurchase: "52 days ago",
      purchaseCount: 5,
      riskScore: 92,
    },
  ],
}

export function ChurnPredictionPanel() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Churn Prediction</CardTitle>
            <CardDescription>AI-powered customer churn analysis</CardDescription>
          </div>
          <AlertTriangle className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Churn Risk Score</h3>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-emerald-600">Low Risk</span>
              <span className="text-sm text-amber-600">Moderate Risk</span>
              <span className="text-sm text-red-600">High Risk</span>
            </div>
            <Progress
              value={churnData.score}
              className="h-3 mb-2"
              indicatorClassName={`${
                churnData.score < 40 ? "bg-emerald-500" : churnData.score < 70 ? "bg-amber-500" : "bg-red-500"
              }`}
            />
            <div className="text-center mt-2">
              <span className="text-2xl font-bold">{churnData.score}%</span>
              <span className="text-sm text-muted-foreground ml-1">Overall Churn Risk</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">High-Risk Customers</h3>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {churnData.highRiskCustomers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white rounded-lg p-3 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{customer.name}</div>
                      <div className="text-xs text-muted-foreground">{customer.email}</div>
                    </div>
                  </div>
                  <Badge riskScore={customer.riskScore} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="text-muted-foreground">
                    Last purchase: <span className="text-foreground">{customer.lastPurchase}</span>
                  </div>
                  <div className="text-muted-foreground">
                    Total purchases: <span className="text-foreground">{customer.purchaseCount}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs h-8 flex-1">
                    <Tag className="h-3 w-3 mr-1" />
                    Send Offer
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-8 flex-1">
                    <Mail className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Badge({ riskScore }: { riskScore: number }) {
  const score = riskScore || 0
  let color = "bg-emerald-100 text-emerald-800"
  let label = "Low Risk"

  if (score >= 80) {
    color = "bg-red-100 text-red-800"
    label = "High Risk"
  } else if (score >= 50) {
    color = "bg-amber-100 text-amber-800"
    label = "Medium Risk"
  }

  return <div className={`text-xs px-2 py-1 rounded-full ${color}`}>{label}</div>
}

