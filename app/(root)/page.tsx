import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.action'



const page = async() => {

  try {
    const user = await getCurrentUser();
    
    if (!user?.id) {
      console.error('No user found or user ID missing');
      return <div>Error: User not found</div>;
    }
    
    console.log('Current user ID:', user.id);
    
    const [userInterviews, latestInterviews] = await Promise.all([
      getInterviewsByUserId(user.id),
      getLatestInterviews({ userId: user.id })
    ]);
 
    console.log('User interviews count:', userInterviews?.length || 0);
    console.log('Latest interviews count:', latestInterviews?.length || 0);

    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpcomingInterviews = latestInterviews?.length > 0;

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
           {hasPastInterviews ? (
                          userInterviews?.map((interview) => (
                              <InterviewCard {...interview} key={interview.id}/>
                          ))) : (
                              <p>You haven&apos;t taken any interviews yet</p>
                      )}
      
          </div>
        </section>

        <section className='flex flex-col gap-6 max-w-lg mt-8'>
          <h2>Take an Interview</h2>
          <div className='interviews-section'>
             {hasUpcomingInterviews ? (
                          latestInterviews?.map((interview) => (
                              <InterviewCard {...interview} key={interview.id}/>
                          ))) : (
                          <p>There are no new interviews available</p>
                      )}
          
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview">Start an Interview</Link>
            </Button>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2>Something went wrong</h2>
        <p>Please try refreshing the page or contact support if the problem persists.</p>
        <Button asChild className="btn-primary">
          <Link href="/interview">Start an Interview</Link>
        </Button>
      </div>
    );
  }
}

      <section className='flex flex-col gap-6 max-w-lg'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>
         {hasPastInterviews ? (
                        userInterviews?.map((interview) => (
                            <InterviewCard {...interview} key={interview.id}/>
                        ))) : (
                            <p>You haven&apos;t taken any interviews yet</p>
                    )}
    
        </div>
      </section>

      <section className='flex flex-col gap-6 max-w-lg mt-8'>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
           {hasUpcomingInterviews ? (
                        latestInterviews?.map((interview) => (
                            <InterviewCard {...interview} key={interview.id}/>
                        ))) : (
                        <p>There are no new interviews available</p>
                    )}
        
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export default page
