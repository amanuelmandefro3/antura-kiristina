import {Button} from '@/components/ui/button'
import Link from 'next/link'
const QuickLinks = ()=>{
    return(
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Get Involved</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/volunteer">Become a Volunteer</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register as a Student</Link>
              </Button>
              <Button asChild>
                <Link href="/give">Support Our Ministry</Link>
              </Button>
            </div>
          </div>
        </section>
    )
}


export default QuickLinks