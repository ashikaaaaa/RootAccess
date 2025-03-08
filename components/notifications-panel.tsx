"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, TrendingUp, AlertTriangle, ShieldAlert } from "lucide-react"
import { useState } from "react"

const notificationsData = [
  {
    id: 1,
    title: "Sales Spike Detected",
    description: "Premium Analytics Dashboard sales increased by 24% in the last hour",
    time: "12 minutes ago",
    type: "sales",
    read: false,
  },
  {
    id: 2,
    title: "Potential Churn Alert",
    description: "5 high-value customers haven't made a purchase in 30+ days",
    time: "45 minutes ago",
    type: "churn",
    read: false,
  },
  {
    id: 3,
    title: "Fraud Detection Warning",
    description: "Unusual purchase pattern detected from IP address 192.168.1.1",
    time: "1 hour ago",
    type: "fraud",
    read: true,
  },
  {
    id: 4,
    title: "New Customer Segment Identified",
    description: "AI has identified a new potential customer segment based on recent purchases",
    time: "3 hours ago",
    type: "insight",
    read: true,
  },
]

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(notificationsData)

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Real-time Notifications</CardTitle>
            <CardDescription>Important alerts and system notifications</CardDescription>
          </div>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border ${notification.read ? "bg-white border-slate-200" : "bg-blue-50 border-blue-200"} hover:border-slate-300 transition-colors`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex">
                <div className="mr-3">
                  <NotificationIcon type={notification.type} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    {!notification.read && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{notification.description}</p>
                  <div className="text-xs text-muted-foreground">{notification.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function NotificationIcon({ type }: { type: string }) {
  switch (type) {
    case "sales":
      return (
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </div>
      )
    case "churn":
      return (
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </div>
      )
    case "fraud":
      return (
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
          <ShieldAlert className="h-4 w-4 text-red-600" />
        </div>
      )
    default:
      return (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Bell className="h-4 w-4 text-blue-600" />
        </div>
      )
  }
}

