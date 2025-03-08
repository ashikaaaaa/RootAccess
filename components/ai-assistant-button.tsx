"use client"

import { useState } from "react"
import { Bot, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")

  return (
    <>
      <Button className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
        <Bot className="h-5 w-5" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 md:w-96 shadow-xl border-slate-200 z-50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">AI Assistant</CardTitle>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 rounded-lg p-3 mb-3 text-sm">
              <p className="mb-2">How can I help you today?</p>
              <p className="text-xs text-muted-foreground">
                Ask me about customer insights, sales data, or recommendations for reducing churn.
              </p>
            </div>

            <div className="space-y-2">
              <SuggestionButton text="Show me customers at risk of churning" />
              <SuggestionButton text="What are my top-selling products?" />
              <SuggestionButton text="Generate a marketing campaign for inactive users" />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Ask a question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="shrink-0">
                <Bot className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

function SuggestionButton({ text }: { text: string }) {
  return (
    <Button variant="outline" className="w-full justify-start h-auto py-2 px-3 text-left text-sm font-normal">
      {text}
    </Button>
  )
}

