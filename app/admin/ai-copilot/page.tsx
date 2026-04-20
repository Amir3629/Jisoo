"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Send,
  Bot,
  User,
  TrendingUp,
  Package,
  Globe,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Zap,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/admin/ui/page-header"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
  insights?: Insight[]
}

interface Insight {
  type: "trend" | "alert" | "opportunity" | "recommendation"
  title: string
  description: string
  metric?: string
  action?: string
}

const quickPrompts = [
  { icon: TrendingUp, label: "Sales Analysis", prompt: "Analyze sales trends for the last 30 days" },
  { icon: Package, label: "Inventory Check", prompt: "Which products are running low on stock?" },
  { icon: Globe, label: "Regional Performance", prompt: "Compare regional performance this quarter" },
  { icon: AlertTriangle, label: "Compliance Issues", prompt: "Show pending compliance issues by priority" },
]

const initialInsights: Insight[] = [
  {
    type: "trend",
    title: "Rising Demand in EU",
    description: "Serum products showing 23% increase in European markets",
    metric: "+23%",
    action: "View Report",
  },
  {
    type: "alert",
    title: "Stock Alert",
    description: "3 bestsellers below reorder threshold",
    metric: "3 items",
    action: "Review Stock",
  },
  {
    type: "opportunity",
    title: "Market Opportunity",
    description: "Japan market shows untapped potential for sunscreen line",
    metric: "$120K",
    action: "Explore",
  },
  {
    type: "recommendation",
    title: "Translation Priority",
    description: "12 product descriptions pending German translation",
    metric: "12 items",
    action: "Translate",
  },
]

const mockResponses: Record<string, { content: string; insights?: Insight[] }> = {
  sales: {
    content: `Based on the last 30 days of sales data, here are the key insights:

**Overall Performance:**
- Total Revenue: $847,234 (+12.3% vs previous period)
- Orders: 2,847 (+8.7%)
- Average Order Value: $297.52 (+3.2%)

**Top Performing Categories:**
1. Serums & Essences: $234,567 (27.7% of total)
2. Moisturizers: $189,234 (22.3%)
3. Cleansers: $156,789 (18.5%)

**Regional Breakdown:**
- North America: 42% of revenue
- Europe: 31% of revenue
- Asia Pacific: 27% of revenue

The data suggests strong momentum in premium skincare, particularly in the anti-aging segment.`,
    insights: [
      { type: "trend", title: "Serum Sales Up", description: "Premium serums driving growth", metric: "+27%" },
      { type: "opportunity", title: "Bundle Opportunity", description: "Serum + Moisturizer bundles performing well", action: "Create Bundle" },
    ],
  },
  inventory: {
    content: `I've identified several products requiring attention:

**Critical Stock Levels (Below 50 units):**
1. **Glow Recipe Watermelon Sleeping Mask** - 23 units remaining
   - Average daily sales: 8 units
   - Days until stockout: ~3 days
   - Recommended action: Expedite reorder

2. **COSRX Snail Mucin Essence** - 45 units remaining
   - Average daily sales: 12 units
   - Days until stockout: ~4 days
   - Recommended action: Contact supplier

3. **Beauty of Joseon Sunscreen** - 38 units remaining
   - Average daily sales: 15 units
   - Days until stockout: ~2.5 days
   - Recommended action: URGENT reorder

**Recommended Actions:**
- Place emergency order for Beauty of Joseon Sunscreen
- Review supplier lead times for top sellers
- Consider safety stock increase for high-velocity items`,
    insights: [
      { type: "alert", title: "Urgent Reorder", description: "Beauty of Joseon Sunscreen critical", metric: "2.5 days", action: "Order Now" },
    ],
  },
  regional: {
    content: `**Q4 Regional Performance Comparison:**

**North America (USA, Canada)**
- Revenue: $1.2M (+15% YoY)
- Top Product: COSRX Snail Mucin
- Growth Driver: TikTok viral products
- Challenge: Shipping costs

**Europe (UK, DE, FR)**
- Revenue: $890K (+22% YoY)
- Top Product: Beauty of Joseon Sunscreen
- Growth Driver: Clean beauty trend
- Challenge: CPSR compliance delays

**Asia Pacific (AU, SG, JP)**
- Revenue: $670K (+8% YoY)
- Top Product: Sulwhasoo First Care Serum
- Growth Driver: Premium positioning
- Challenge: Local competition

**Key Insight:** Europe showing strongest growth, consider increasing marketing budget allocation.`,
    insights: [
      { type: "trend", title: "EU Growth Leader", description: "22% YoY growth in European markets", metric: "+22%" },
      { type: "recommendation", title: "Budget Reallocation", description: "Consider shifting 10% budget to EU", action: "Review Budget" },
    ],
  },
  compliance: {
    content: `**Pending Compliance Issues by Priority:**

**Critical (Action Required Immediately):**
1. **CPSR Certificate Renewal - Niacinamide Serum**
   - Region: EU
   - Deadline: 5 days
   - Status: Documents submitted, awaiting approval
   - Risk: Product delisting if not resolved

**High Priority (Within 2 weeks):**
2. **FDA Registration Update - 3 New Products**
   - Region: USA
   - Deadline: 12 days
   - Status: In progress
   
3. **NMPA Label Translation - Sunscreen Line**
   - Region: China
   - Deadline: 14 days
   - Status: Translation pending

**Medium Priority (Within 1 month):**
- 5 CPSR renewals for EU market
- 2 KFDA certifications for South Korea
- 3 TGA notifications for Australia

**Recommendation:** Assign dedicated resource to critical CPSR renewal to avoid stock disruption.`,
    insights: [
      { type: "alert", title: "CPSR Urgent", description: "Niacinamide Serum renewal in 5 days", metric: "5 days", action: "Expedite" },
    ],
  },
}

export default function AICopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI operations copilot. I can help you analyze sales data, monitor inventory, track compliance, and identify opportunities across your global operations. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: quickPrompts.map((p) => p.prompt),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleSend = async (prompt?: string) => {
    const messageText = prompt || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response = {
        content: "I understand you're asking about that. Let me analyze the data and provide insights. Based on current trends and historical patterns, I recommend reviewing the detailed analytics dashboard for more specific information.",
        insights: [] as Insight[],
      }

      const lowerPrompt = messageText.toLowerCase()
      if (lowerPrompt.includes("sales") || lowerPrompt.includes("revenue")) {
        response = mockResponses.sales
      } else if (lowerPrompt.includes("inventory") || lowerPrompt.includes("stock")) {
        response = mockResponses.inventory
      } else if (lowerPrompt.includes("regional") || lowerPrompt.includes("region")) {
        response = mockResponses.regional
      } else if (lowerPrompt.includes("compliance") || lowerPrompt.includes("regulation")) {
        response = mockResponses.compliance
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
        insights: response.insights,
        suggestions: ["Show me more details", "Export this report", "Set up alerts for this"],
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getInsightIcon = (type: Insight["type"]) => {
    switch (type) {
      case "trend":
        return TrendingUp
      case "alert":
        return AlertTriangle
      case "opportunity":
        return Lightbulb
      case "recommendation":
        return Zap
    }
  }

  const getInsightColor = (type: Insight["type"]) => {
    switch (type) {
      case "trend":
        return "text-blue-600 bg-blue-50"
      case "alert":
        return "text-amber-600 bg-amber-50"
      case "opportunity":
        return "text-emerald-600 bg-emerald-50"
      case "recommendation":
        return "text-purple-600 bg-purple-50"
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Operations Copilot"
        description="Your intelligent assistant for data analysis, insights, and operational guidance"
        icon={<Sparkles className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-220px)] flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-rose-50 to-amber-50 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">JISOO AI Copilot</CardTitle>
                  <p className="text-xs text-muted-foreground">Powered by advanced analytics</p>
                </div>
                <Badge variant="outline" className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-200">
                  Online
                </Badge>
              </div>
            </CardHeader>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                    >
                      {message.role === "assistant" && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] ${
                          message.role === "user"
                            ? "bg-charcoal text-white rounded-2xl rounded-br-sm px-4 py-3"
                            : "bg-muted/50 rounded-2xl rounded-bl-sm px-4 py-3"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>

                        {message.insights && message.insights.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.insights.map((insight, idx) => {
                              const Icon = getInsightIcon(insight.type)
                              return (
                                <div
                                  key={idx}
                                  className={`flex items-center gap-2 p-2 rounded-lg ${getInsightColor(insight.type)}`}
                                >
                                  <Icon className="h-4 w-4 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium">{insight.title}</p>
                                    <p className="text-xs opacity-80 truncate">{insight.description}</p>
                                  </div>
                                  {insight.metric && (
                                    <span className="text-xs font-bold">{insight.metric}</span>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {message.role === "assistant" && (
                          <div className="mt-2 flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => handleCopy(message.content, message.id)}
                            >
                              {copiedId === message.id ? (
                                <Check className="h-3 w-3 mr-1" />
                              ) : (
                                <Copy className="h-3 w-3 mr-1" />
                              )}
                              {copiedId === message.id ? "Copied" : "Copy"}
                            </Button>
                          </div>
                        )}

                        {message.suggestions && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.suggestions.slice(0, 3).map((suggestion, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs bg-white hover:bg-rose-50"
                                onClick={() => handleSend(suggestion)}
                              >
                                {suggestion}
                                <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      {message.role === "user" && (
                        <div className="h-8 w-8 rounded-full bg-charcoal flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-muted/50 rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 bg-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 bg-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 bg-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about sales, inventory, compliance, or regional performance..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!input.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Prompts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Quick Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickPrompts.map((item, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-start h-auto py-3 px-3"
                  onClick={() => handleSend(item.prompt)}
                >
                  <item.icon className="h-4 w-4 mr-2 text-rose-500" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Live Insights */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Live Insights</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {initialInsights.map((insight, idx) => {
                const Icon = getInsightIcon(insight.type)
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-3 rounded-lg ${getInsightColor(insight.type)} cursor-pointer hover:scale-[1.02] transition-transform`}
                    onClick={() => handleSend(insight.description)}
                  >
                    <div className="flex items-start gap-2">
                      <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium">{insight.title}</p>
                        <p className="text-xs opacity-80 mt-0.5">{insight.description}</p>
                        {insight.metric && (
                          <p className="text-sm font-bold mt-1">{insight.metric}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </CardContent>
          </Card>

          {/* Capabilities */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-3 w-3 text-rose-500" />
                  Sales & revenue analysis
                </li>
                <li className="flex items-center gap-2">
                  <Package className="h-3 w-3 text-rose-500" />
                  Inventory monitoring
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-3 w-3 text-rose-500" />
                  Regional performance
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-rose-500" />
                  Compliance tracking
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-3 w-3 text-rose-500" />
                  Opportunity detection
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
