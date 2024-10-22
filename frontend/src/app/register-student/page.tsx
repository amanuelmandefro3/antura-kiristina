'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useLanguage } from '@/components/LanguageContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from 'lucide-react'

type FormData = {
  fullName: string
  age: number
  email: string
  phoneNumber?: string
  churchName: string
  address: string
  familyMemberName: string
  familyPhoneNumber: string
  q1: string
  q2: string
  q3: string
  q4: string
  q5: string
  q6: string
  q7: string
  q8: string
  q9: string
}

export default function StudentRegistrationForm() {
  const { t } = useLanguage()
  const [page, setPage] = useState(1)
  const [showThirdPageErrors, setShowThirdPageErrors] = useState(false)
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    // Here you would typically send the form data to your server
    alert('Form submitted successfully!')
  }

  const nextPage = async () => {
    const fieldsToValidate: (keyof FormData)[] = page === 1
      ? ['fullName', 'age', 'email', 'churchName', 'address', 'familyMemberName', 'familyPhoneNumber']
      : ['q1', 'q2', 'q3', 'q4', 'q5']

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      setPage(page + 1)
    }
  }

  const prevPage = () => {
    setPage(page - 1)
    if (page === 3) {
      setShowThirdPageErrors(false)
    }
  }

  const handleFinalSubmit = async () => {
    const isValid = await trigger(['q6', 'q7', 'q8', 'q9'])
    setShowThirdPageErrors(true)
    if (isValid) {
      handleSubmit(onSubmit)()
    }
  }

  const renderAsterisk = () => <span className="text-red-500">*</span>

  return (
    <div className="flex flex-col  min-h-screen"> 
    <main className="flex-grow">
    <section className="bg-primary text-primary-foreground pt-28 py-16">
          <div className="container mx-auto text-center pt-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('studentRegistration.title')}</h1>
            <p className="text-xl mb-8">{t('about.subtitle')}</p>
          </div>
    </section>
      <Card className="w-full max-w-4xl mx-auto my-2">
        <CardHeader>
          <CardTitle>{t('studentRegistration.title')}</CardTitle>
          <CardDescription>{t('studentRegistration.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            {page === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">{t('form.fullName')} {renderAsterisk()}</Label>
                    <Input id="fullName" {...register('fullName', { required: true })} className="mt-1" />
                    {errors.fullName && <span className="text-red-500 text-sm">{t('form.required')}</span>}
                  </div>
                  <div>
                    <Label htmlFor="age">{t('form.age')} {renderAsterisk()}</Label>
                    <Input id="age" type="number" {...register('age', { required: true, min: 13, max: 19 })} className="mt-1" />
                    {errors.age && <span className="text-red-500 text-sm">{t('form.ageError')}</span>}
                  </div>
                  <div>
                    <Label htmlFor="email">{t('form.email')} {renderAsterisk()}</Label>
                    <Input id="email" type="email" {...register('email', { required: true })} className="mt-1" />
                    {errors.email && <span className="text-red-500 text-sm">{t('form.required')}</span>}
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">{t('form.phoneNumber')}</Label>
                    <Input id="phoneNumber" {...register('phoneNumber')} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="churchName">{t('form.churchName')} {renderAsterisk()}</Label>
                    <Input id="churchName" {...register('churchName', { required: true })} className="mt-1" />
                    {errors.churchName && <span className="text-red-500 text-sm">{t('form.required')}</span>}
                  </div>
                  <div>
                    <Label htmlFor="address">{t('form.address')} {renderAsterisk()}</Label>
                    <Input id="address" {...register('address', { required: true })} className="mt-1" />
                    {errors.address && <span className="text-red-500 text-sm">{t('form.required')}</span>}
                  </div>
                  <div>
                    <Label htmlFor="familyMemberName">{t('form.familyMemberName')} {renderAsterisk()}</Label>
                    <Input id="familyMemberName" {...register('familyMemberName', { required: true })} className="mt-1" />
                    {errors.familyMemberName && <span className="text-red-500 text-sm">{t('form.required')}</span>}
                  </div>
                  <div>
                    <Label htmlFor="familyPhoneNumber">{t('form.familyPhoneNumber')} {renderAsterisk()}</Label>
                    <Input id="familyPhoneNumber" {...register('familyPhoneNumber', { required: true })} className="mt-1" />
                    {errors.familyPhoneNumber && <span className="text-red-500 text-sm">{t('form.required')}</span>}
                  </div>
                </div>
              </div>
            )}

            {page === 2 && (
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((q) => (
                  <div key={q} className="space-y-2">
                    <Label htmlFor={`q${q}`}>{t(`form.q${q}`)} {renderAsterisk()}</Label>
                    <Textarea
                      id={`q${q}`}
                      {...register(`q${q}` as keyof FormData, { required: true })}
                      className="mt-1 h-32"
                    />
                    {errors[`q${q}` as keyof FormData] && <span className="text-red-500 text-sm">{t('form.required')}</span>}
                  </div>
                ))}
              </div>
            )}

            {page === 3 && (
              <div className="space-y-6">
                {[6, 7, 8, 9].map((q) => (
                  <div key={q} className="space-y-2">
                    <Label htmlFor={`q${q}`}>{t(`form.q${q}`)} {renderAsterisk()}</Label>
                    <Textarea
                      id={`q${q}`}
                      {...register(`q${q}` as keyof FormData, { required: true })}
                      className="mt-1 h-32"
                    />
                    {showThirdPageErrors && errors[`q${q}` as keyof FormData] && (
                      <span className="text-red-500 text-sm">{t('form.required')}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-between">
              {page > 1 && (
                <Button type="button" onClick={prevPage} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t('form.previous')}
                </Button>
              )}
              {page < 3 ? (
                <Button type="button" onClick={nextPage} className="ml-auto bg-anturaGreen/80 hover:bg-anturaGreen">
                  {t('form.next')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" onClick={handleFinalSubmit} className="ml-auto">
                  {t('form.submit')}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
    <footer className="bg-muted py-8">
        <div className="container mx-auto text-center">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  )
}