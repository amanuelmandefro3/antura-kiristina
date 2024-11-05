'use client'
import { useLanguage } from '@/components/LanguageContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RegistrationSuccess() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-100 border-0">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-2xl font-bold text-green-700">
              {t("registrationSuccess.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              {t("registrationSuccess.message")}
            </p>
            <Button asChild className="w-full">
              <Link href="/">
                {t("registrationSuccess.goHome")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-muted py-4">
        <div className="container mx-auto text-center text-sm text-gray-600">
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  )
}