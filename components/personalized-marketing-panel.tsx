"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ShoppingCart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const marketingData = {
  recommendedProducts: [
    {
      id: 1,
      name: "Premium Analytics Dashboard",
      description: "Advanced analytics with AI-powered insights",
      price: 199,
      image: "/placeholder.svg?height=80&width=80",
      category: "Analytics",
    },
    {
      id: 2,
      name: "Customer Engagement Suite",
      description: "Tools to boost customer interaction and loyalty",
      price: 149,
      image: "/placeholder.svg?height=80&width=80",
      category: "Engagement",
    },
    {
      id: 3,
      name: "Email Marketing Automation",
      description: "Automated email campaigns with personalization",
      price: 99,
      image: "/placeholder.svg?height=80&width=80",
      category: "Marketing",
    },
  ],
  crossSellProducts: [
    {
      id: 4,
      name: "Data Integration Module",
      description: "Connect your CRM with other business tools",
      price: 79,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 5,
      name: "Mobile CRM App",
      description: "Access your CRM data on the go",
      price: 49,
      image: "/placeholder.svg?height=60&width=60",
    },
  ],
}

export function PersonalizedMarketingPanel() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Personalized Marketing</CardTitle>
            <CardDescription>AI-recommended products and cross-selling opportunities</CardDescription>
          </div>
          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recommended">
          <TabsList className="mb-4">
            <TabsTrigger value="recommended">Recommended Products</TabsTrigger>
            <TabsTrigger value="crosssell">Cross-Sell Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended">
            <div className="space-y-4">
              {marketingData.recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg p-3 border border-slate-200 hover:border-slate-300 transition-colors flex"
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-20 h-20 rounded-md mr-3 bg-slate-100 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {product.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">${product.price}</div>
                      <Button size="sm" className="h-8">
                        <Plus className="h-3 w-3 mr-1" />
                        Add to Campaign
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="crosssell">
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-medium mb-2">Customers Who Bought This Also Viewed</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Based on purchase patterns of similar customer segments
              </p>

              <div className="grid grid-cols-2 gap-3">
                {marketingData.crossSellProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg p-3 border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 rounded-md mr-3 bg-slate-100 object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <div className="text-xs text-muted-foreground">${product.price}</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                    <Button size="sm" variant="outline" className="w-full text-xs h-7">
                      Add to Suggestions
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full">Generate More Cross-Sell Recommendations</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

