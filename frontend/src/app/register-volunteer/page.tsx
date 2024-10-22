'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useLanguage } from '@/components/LanguageContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

type FormData = {
  fullName: string
  age: 'under20' | '20to30' | 'over30'
  address: string
  phoneNumber: string
  email: string
  residentialAddress: string
  educationLevel: string
  employmentStatus: string
  church: string
  serviceAreas: string[]
  socialMedia: string
  availabilityFrequency: string
}

export default function VolunteerRegistrationForm() {
  const { t } = useLanguage()
  const { register, handleSubmit, formState: { errors }} = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    // Here you would typically send the form data to your server
    alert('U Registered As Volunteer successful!')
  }

  const renderAsterisk = () => <span className="text-red-500">*</span>

  return (
    <div className="flex flex-col  min-h-screen"> 

    <main className="flex-grow">
    <section className="bg-primary text-primary-foreground pt-28 py-16">
          <div className="container mx-auto text-center ">
            <h1 className="text-4xl md:text-6xl font-bold my-4">{t('volunteerRegistration.title')}</h1>
            <p className="text-xl mb-8">{t('about.subtitle')}</p>
          </div>
    </section>
      <Card className="w-full max-w-4xl mx-auto  my-2">
        <CardHeader>
          {/* <CardTitle>{t('volunteerRegistration.title')}</CardTitle> */}
          <CardDescription>{t('volunteerRegistration.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">{t('volunteerForm.fullName')} {renderAsterisk()}</Label>
                <Input id="fullName" {...register('fullName', { required: true })} className="mt-1" />
                {errors.fullName && <span className="text-red-500 text-sm">{t('form.required')}</span>}
              </div>
              <div>
                    <Label htmlFor="age">{t('volunteerForm.age')} {renderAsterisk()}</Label>
                    <Input id="age" type="number" {...register('age', { required: true, min: 20, max: 30 })} className="mt-1" />
                    {errors.age && <span className="text-red-500 text-sm">{t('volunteerForm.ageError')}</span>}
                  </div>
              <div>
                <Label htmlFor="address">{t('volunteerForm.address')} {renderAsterisk()}</Label>
                <Input id="address" {...register('address', { required: true })} className="mt-1" />
                {errors.address && <span className="text-red-500 text-sm">{t('volunteerForm.required')}</span>}
              </div>
              <div>
                <Label htmlFor="phoneNumber">{t('form.phoneNumber')} {renderAsterisk()}</Label>
                <Input id="phoneNumber" {...register('phoneNumber', { required: true })} className="mt-1" />
                {errors.phoneNumber && <span className="text-red-500 text-sm">{t('volunteerForm.required')}</span>}
              </div>
              <div>
                <Label htmlFor="email">{t('volunteerForm.email')} {renderAsterisk()}</Label>
                <Input id="email" type="email" {...register('email', { required: true })} className="mt-1" />
                {errors.email && <span className="text-red-500 text-sm">{t('volunteerForm.required')}</span>}
              </div>
              <div>
                <Label htmlFor="residentialAddress">{t('volunteerForm.residentialAddress')} {renderAsterisk()}</Label>
                <Input id="residentialAddress" {...register('residentialAddress', { required: true })} className="mt-1" />
                {errors.residentialAddress && <span className="text-red-500 text-sm">{t('volunteerForm.required')}</span>}
              </div>
              <div>
                <Label htmlFor="educationLevel">{t('volunteerForm.educationLevel')} {renderAsterisk()}</Label>
                <Input id="educationLevel" {...register('educationLevel', { required: true })} className="mt-1" />
                {errors.educationLevel && <span className="text-red-500 text-sm">{t('volunteerForm.required')}</span>}
              </div>
              <div>
                <Label htmlFor="employmentStatus">{t('volunteerForm.employmentStatus')} {renderAsterisk()}</Label>
                <Input id="employmentStatus" {...register('employmentStatus', { required: true })} className="mt-1" />
                {errors.employmentStatus && <span className="text-red-500 text-sm">{t('volunteerForm.required')}</span>}
              </div>
              <div>
                <Label htmlFor="church">{t('volunteerForm.church')} {renderAsterisk()}</Label>
                <Input id="church" {...register('church', { required: true })} className="mt-1" />
                {errors.church && <span className="text-red-500 text-sm">{t('volunteerForm.required')}</span>}
              </div>
              <div>
                <Label htmlFor="socialMedia">{t('volunteerForm.socialMedia')}</Label>
                <Input id="socialMedia" {...register('socialMedia')} className="mt-1" />
              </div>
            </div>

            <div>
              <Label>{t('volunteerForm.serviceAreasQuestion')} {renderAsterisk()}</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['teaching', 'counseling', 'coordinating', 'assignedPlace', 'other'].map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox id={area} {...register('serviceAreas', { required: true })} value={area} />
                    <Label htmlFor={area}>{t(`volunteerForm.serviceAreas.${area}`)}</Label>
                  </div>
                ))}
              </div>
              {errors.serviceAreas && <span className="text-red-500 text-sm">{t('volunteerForm.required')}</span>}
            </div>

            <div>
              <Label>{t('volunteerForm.availabilityFrequencyQuestion')} {renderAsterisk()}</Label>
              <RadioGroup onValueChange={(value) => register('availabilityFrequency', { value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="onceAWeek" id="onceAWeek" />
                  <Label htmlFor="onceAWeek">{t('volunteerForm.availabilityFrequency.onceAWeek')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="twiceAWeek" id="twiceAWeek" />
                  <Label htmlFor="twiceAWeek">{t('volunteerForm.availabilityFrequency.twiceAWeek')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="asNeeded" id="asNeeded" />
                  <Label htmlFor="asNeeded">{t('volunteerForm.availabilityFrequency.asNeeded')}</Label>
                </div>
              </RadioGroup>
              {errors.availabilityFrequency && <span className="text-red-500 text-sm">{t('volunteerForm.required')}</span>}
            </div>

            <Button type="submit" className="w-full bg-anturaGreen">
              {t('volunteerForm.submit')}
            </Button>
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