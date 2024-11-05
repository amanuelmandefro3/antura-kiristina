'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useLanguage } from "@/components/LanguageContext"
import { Button } from "@/components/ui/button"
import {useRouter} from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'react-hot-toast'
import { ArrowPathIcon } from "@heroicons/react/24/outline"

type FormData = {
  fullName: string
  age: number
  address: string
  phoneNumber: string
  email: string
  residentialAddress: string
  educationLevel: string
  employmentStatus: string
  church: string
  serviceAreas: string
  otherServiceArea?: string
  socialMedia: string
  availabilityFrequency: string
}

export default function VolunteerRegistrationForm() {

  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>()
  const router = useRouter()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('https://aksc-ministry.onrender.com/api/volunteer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          age: Number(data.age),
          serviceAreas: data.serviceAreas === 'other' ? data.otherServiceArea : data.serviceAreas
        }),
      })
      const result = await response.json()
      console.log('API Response:', result)

      if (result.success) {
        toast.success(t('volunteerForm.submitSuccess'))
        router.push('/registration-success')
        // Reset form or redirect user as needed
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error(t('volunteerForm.submitError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderAsterisk = () => <span className="text-red-500" aria-hidden="true">*</span>

  const serviceAreas = watch("serviceAreas")

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-primary text-primary-foreground pt-28 py-16 h-80">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold my-4">{t("volunteerRegistration.title")}</h1>
            <p className="text-xl mb-8">{t("about.subtitle")}</p>
          </div>
        </section>
        <Card className="w-full max-w-4xl mx-auto my-8">
          <CardHeader>
            <CardTitle>{t("volunteerRegistration.title")}</CardTitle>
            <CardDescription>{t("volunteerRegistration.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">{t("volunteerForm.fullName")} {renderAsterisk()}</Label>
                  <Input id="fullName" {...register("fullName", { required: t("form.required") })} className="mt-1" />
                  {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
                </div>
                <div>
                  <Label htmlFor="age">{t("volunteerForm.age")} {renderAsterisk()}</Label>
                  <Input id="age" type="number" {...register("age", {
                    required: t("form.required"),
                    min: { value: 18, message: t("volunteerForm.ageError") },
                    max: { value: 99, message: t("volunteerForm.ageError") }
                  })} className="mt-1" />
                  {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
                </div>
                <div>
                  <Label htmlFor="address">{t("volunteerForm.address")} {renderAsterisk()}</Label>
                  <Input id="address" {...register("address", { required: t("form.required") })} className="mt-1" />
                  {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                </div>
                <div>
                  <Label htmlFor="phoneNumber">{t("form.phoneNumber")} {renderAsterisk()}</Label>
                  <Input id="phoneNumber" {...register("phoneNumber", { required: t("form.required") })} className="mt-1" />
                  {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
                </div>
                <div>
                  <Label htmlFor="email">{t("volunteerForm.email")} {renderAsterisk()}</Label>
                  <Input id="email" type="email" {...register("email", {
                    required: t("form.required"),
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t("form.invalidEmail") }
                  })} className="mt-1" />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
                <div>
                  <Label htmlFor="residentialAddress">{t("volunteerForm.residentialAddress")} {renderAsterisk()}</Label>
                  <Input id="residentialAddress" {...register("residentialAddress", { required: t("form.required") })} className="mt-1" />
                  {errors.residentialAddress && <span className="text-red-500 text-sm">{errors.residentialAddress.message}</span>}
                </div>
                <div>
                  <Label htmlFor="educationLevel">{t("volunteerForm.educationLevel")} {renderAsterisk()}</Label>
                  <Select onValueChange={(value) => register("educationLevel").onChange({ target: { name: "educationLevel", value } })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={t("volunteerForm.selectEducationLevel")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="highSchool">{t("volunteerForm.educationLevels.highSchool")}</SelectItem>
                      <SelectItem value="bachelors">{t("volunteerForm.educationLevels.bachelors")}</SelectItem>
                      <SelectItem value="masters">{t("volunteerForm.educationLevels.masters")}</SelectItem>
                      <SelectItem value="phd">{t("volunteerForm.educationLevels.phd")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.educationLevel && <span className="text-red-500 text-sm">{errors.educationLevel.message}</span>}
                </div>
                <div>
                  <Label htmlFor="employmentStatus">{t("volunteerForm.employmentStatus")} {renderAsterisk()}</Label>
                  <Select onValueChange={(value) => register("employmentStatus").onChange({ target: { name: "employmentStatus", value } })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={t("volunteerForm.selectEmploymentStatus")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">{t("volunteerForm.employmentStatuses.employed")}</SelectItem>
                      <SelectItem value="unemployed">{t("volunteerForm.employmentStatuses.unemployed")}</SelectItem>
                      <SelectItem value="student">{t("volunteerForm.employmentStatuses.student")}</SelectItem>
                      <SelectItem value="retired">{t("volunteerForm.employmentStatuses.retired")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.employmentStatus && <span className="text-red-500 text-sm">{errors.employmentStatus.message}</span>}
                </div>
                <div>
                  <Label htmlFor="church">{t("volunteerForm.church")} {renderAsterisk()}</Label>
                  <Input id="church" {...register("church", { required: t("form.required") })} className="mt-1" />
                  {errors.church && <span className="text-red-500 text-sm">{errors.church.message}</span>}
                </div>
                <div>
                  <Label htmlFor="socialMedia">{t("volunteerForm.socialMedia")}</Label>
                  <Input id="socialMedia" {...register("socialMedia")} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t("volunteerForm.serviceAreasQuestion")} {renderAsterisk()}</Label>
                  <RadioGroup defaultValue={serviceAreas} onValueChange={(value) => {
                    register("serviceAreas").onChange({ target: { name: "serviceAreas", value } });
                  }} className="mt-2 space-y-2">
                    {["Teaching", "Counseling", "Ccoordinating", "AssignedPlace", "Other"].map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <RadioGroupItem value={area} id={area} />
                        <Label htmlFor={area}>{t(`volunteerForm.serviceAreas.${area}`)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.serviceAreas && <span className="text-red-500 text-sm">{t("form.required")}</span>}

                  {serviceAreas === "other" && (
                    <div className="mt-2">
                      <Input id="otherServiceArea" {...register("otherServiceArea", { required: serviceAreas === "other" })} className="mt-1" />
                      {errors.otherServiceArea && <span className="text-red-500 text-sm">{t("form.required")}</span>}
                    </div>
                  )}
                </div>

                <div>
                  <Label>{t("volunteerForm.availabilityFrequencyQuestion")} {renderAsterisk()}</Label>
                  <RadioGroup {...register("availabilityFrequency", { required: t("form.required") })} className="mt-2 space-y-2">
                    {["onceAWeek", "twiceAWeek", "asNeeded"].map((frequency) => (
                      <div key={frequency} className="flex items-center space-x-2">
                        <RadioGroupItem value={frequency} id={frequency} />
                        <Label htmlFor={frequency}>{t(`volunteerForm.availabilityFrequency.${frequency}`)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.availabilityFrequency && <span className="text-red-500 text-sm">{errors.availabilityFrequency.message}</span>}
                </div>
              </div>
              <div className="w-full flex items-end justify-end">
                <Button type="submit" className="bg-anturaGreen w-40 hover:bg-anturaGreen" disabled={isSubmitting}>
                  {isSubmitting ? <div className="flex justify-center items-center">
                    <ArrowPathIcon className="h-5 w-5 animate-spin text-white" />
                  </div>  : t("volunteerForm.submit")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-muted py-8">
        <div className="container mx-auto text-center">
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  )
}