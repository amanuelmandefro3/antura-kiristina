'use client'
import { useLanguage } from "@/components/LanguageContext";

const Footer = ()=>{
    const { t } = useLanguage()
    return (
      <footer className="bg-muted py-8">
      <div className="container mx-auto text-center">
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
    )
}

export default Footer