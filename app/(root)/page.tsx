import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from "@/components/InterviewCard";


const page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview Ready with AI-Powered Practice & Feedback</h2>
          <p className='text-lg'>
            Practice on <strong>real interview questions</strong> and get instant feedback.
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="hidden sm:block"
        />
      </section>

      <section className='flex flex-col gap-6 max-w-lg'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>
         {dummyInterviews.map((interview) => (
          <InterviewCard {...interview}
          key={interview.id}/>
        ))}
       {/*dummyInterviews.length === 0 && <p> You haven&apos;t taken any interviews yet.</p>*/}
        </div>
      </section>

      <section className='flex flex-col gap-6 max-w-lg mt-8'>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
          <InterviewCard {...interview}
          key={interview.id}/>


        ))}
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export default page
