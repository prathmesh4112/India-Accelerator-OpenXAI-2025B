import { Icon } from "@iconify/react";

export function MedicalSymptomCheckerChatbot() {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 h-full border-r border-border/40 flex flex-col bg-background">
        {/* Sidebar Header */}
        <header className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
              <Icon
                icon="medical-icon:i-health-services"
                className="h-5 w-5 text-white"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HealthBot AI
              </h2>
              <p className="text-xs text-muted-foreground">Symptom Checker</p>
            </div>
          </div>
        </header>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto px-2 py-4">
          {/* Chat History */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Chat History
            </p>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20">
                <Icon icon="mdi:chat" className="h-4 w-4" />
                <span>Current Consultation</span>
                <div className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse"></div>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50">
                <Icon icon="mdi:history" className="h-4 w-4" />
                <span>Headache Check - Today</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50">
                <Icon icon="mdi:history" className="h-4 w-4" />
                <span>Fever Symptoms - Yesterday</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50">
                <Icon icon="mdi:history" className="h-4 w-4" />
                <span>Cough Analysis - 2 days ago</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Quick Actions
            </p>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50">
                <Icon icon="mdi:plus-circle" className="h-4 w-4" />
                <span>New Consultation</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50">
                <Icon icon="mdi:bookmark" className="h-4 w-4" />
                <span>Saved Conditions</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50">
                <Icon icon="mdi:file-document" className="h-4 w-4" />
                <span>Health Reports</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <footer className="border-t border-border/40 p-4">
          <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
            <Icon
              icon="mdi:alert-circle"
              className="h-4 w-4 text-amber-600 shrink-0"
            />
            <p className="text-xs text-amber-800 dark:text-amber-200">
              AI suggestions are not medical advice. Always consult a healthcare
              professional.
            </p>
          </div>
        </footer>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-border/40 bg-background/95 backdrop-blur px-6">
          <button className="p-2 rounded-md hover:bg-muted">
            <Icon icon="mdi:menu" className="h-5 w-5" />
          </button>
          <div className="h-6 w-px bg-border/40" />
          <div className="flex items-center gap-3 flex-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Icon icon="mdi:robot" className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">AI Health Assistant</h1>
              <p className="text-xs text-muted-foreground">
                Online • Ready to help
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-muted">
              <Icon icon="mdi:share" className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-md hover:bg-muted">
              <Icon icon="mdi:dots-vertical" className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* AI Message */}
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-2xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                <Icon icon="mdi:robot" className="h-4 w-4 text-white" />
              </div>
              <div className="border rounded-lg shadow-sm px-4 py-3">
                <p className="text-sm leading-relaxed">
                  Hello! I'm your AI Health Assistant. Please describe your
                  symptoms, and I'll try to guide you.
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Icon icon="mdi:clock" className="h-3 w-3" />
                  <span>Just now</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex justify-end">
            <div className="flex items-start gap-3 max-w-2xl">
              <div className="bg-primary text-white rounded-lg shadow-sm border px-4 py-3">
                <p className="text-sm leading-relaxed">
                  I've been experiencing headaches for the past 3 days, along
                  with nausea and sensitivity to light.
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs opacity-80">
                  <Icon icon="mdi:clock" className="h-3 w-3" />
                  <span>2 minutes ago</span>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Icon
                  icon="mdi:account"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-2xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                <Icon icon="mdi:robot" className="h-4 w-4 text-white" />
              </div>
              <div className="border rounded-lg shadow-sm px-4 py-3 space-y-3">
                <p className="text-sm leading-relaxed">
                  Based on your symptoms (one-sided headache, nausea, light
                  sensitivity), this could indicate a migraine.
                </p>

                {/* Suggestion Box */}
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      icon="mdi:lightbulb"
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Immediate Relief
                    </span>
                  </div>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Rest in a dark, quiet room</li>
                    <li>• Apply cold compress to your head</li>
                    <li>• Stay hydrated</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      icon="mdi:alert"
                      className="h-4 w-4 text-amber-600"
                    />
                    <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      When to See a Doctor
                    </span>
                  </div>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    If headaches persist, worsen, or you experience fever,
                    confusion, or vision changes, seek medical attention.
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Icon icon="mdi:clock" className="h-3 w-3" />
                  <span>1 minute ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typing Indicator */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-full">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                <div
                  className="w-1 h-1 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span>AI is thinking...</span>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-border/40 bg-background/50 backdrop-blur p-4">
          <div className="flex items-center gap-2 mb-3">
            <button className="px-2 py-1 border rounded-md text-xs flex items-center gap-1 hover:bg-muted">
              <Icon icon="mdi:camera" className="h-3 w-3" />
              Photo
            </button>
            <button className="px-2 py-1 border rounded-md text-xs flex items-center gap-1 hover:bg-muted">
              <Icon icon="mdi:microphone" className="h-3 w-3" />
              Voice
            </button>
            <button className="px-2 py-1 border rounded-md text-xs flex items-center gap-1 hover:bg-muted">
              <Icon icon="mdi:file-document" className="h-3 w-3" />
              Report
            </button>
          </div>

          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                placeholder="Describe your symptoms in detail..."
                className="w-full min-h-[60px] max-h-32 resize-none border rounded-md px-3 py-2 pr-12 bg-background/80 backdrop-blur focus:border-primary/60"
              ></textarea>
              <button className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                <Icon icon="mdi:send" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Icon
                  icon="mdi:shield-check"
                  className="h-3 w-3 text-green-500"
                />
                Secure & Private
              </span>
              <span className="flex items-center gap-1">
                <Icon icon="mdi:clock" className="h-3 w-3" />
                Response time: ~2s
              </span>
            </div>
            <span>Press Enter to send</span>
          </div>
        </div>
      </main>
    </div>
  );
}
