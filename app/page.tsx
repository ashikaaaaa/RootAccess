import { DashboardHeader } from "@/components/dashboard-header"
import { CustomerInsightPanel } from "@/components/customer-insight-panel"
import { SalesAnalyticsPanel } from "@/components/sales-analytics-panel"
import { ChurnPredictionPanel } from "@/components/churn-prediction-panel"
import { PersonalizedMarketingPanel } from "@/components/personalized-marketing-panel"
import { NotificationsPanel } from "@/components/notifications-panel"
import { AIAssistantButton } from "@/components/ai-assistant-button"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomerInsightPanel />
          <SalesAnalyticsPanel />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ChurnPredictionPanel />
          <PersonalizedMarketingPanel />
        </div>
        <div className="mt-6">
          <NotificationsPanel />
        </div>
      </main>
      <AIAssistantButton />
    </div>
  )
}

