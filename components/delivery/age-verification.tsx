"use client"

import { useState, useEffect } from "react"
import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AgeVerification() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const ageVerified = localStorage.getItem("age_verified")
    if (!ageVerified) {
      setIsVisible(true)
    }
  }, [])

  const handleConfirm = () => {
    localStorage.setItem("age_verified", "true")
    setIsVisible(false)
  }

  const handleDeny = () => {
    window.location.href = "https://www.google.com"
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 mx-4 max-w-sm w-full animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-amber-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              {"Confirme sua idade"}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"Este site vende bebidas alco\u00f3licas. Para continuar, voc\u00ea precisa ter 18 anos ou mais."}
            </p>
          </div>

          <div className="w-full border-t border-border pt-4">
            <p className="text-xs text-muted-foreground mb-4">
              {"Voc\u00ea tem 18 anos ou mais?"}
            </p>
            <div className="flex gap-3 w-full">
              <Button
                onClick={handleDeny}
                variant="outline"
                className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
              >
                {"N\u00e3o"}
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {"Sim, tenho +18"}
              </Button>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground leading-relaxed">
            {"A venda de bebidas alco\u00f3licas \u00e9 proibida para menores de 18 anos. Lei n\u00ba 9.294/96."}
          </p>
        </div>
      </div>
    </div>
  )
}
