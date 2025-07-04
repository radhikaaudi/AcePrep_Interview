
import { ReactNode } from 'react'
//import RootLayout from '../layout';
//import { Link } from 'lucide-react';
import Link from 'next/link';
import {isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";

import Image from 'next/image';

const RootLayout =async ({
    children,
    }: {
    children: ReactNode;
}) => {
  const isUserAuthenticated= await isAuthenticated();
  if(!isUserAuthenticated)
    redirect('/sign-in');

  return (
    <div className='root-layout'>
      <nav>
        <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={38} height={32} />
        <h2 className='text-primary-100'>
          AcePrep

        </h2>
        </Link>
        {children}

      </nav>

    </div>
  )
}

export default RootLayout