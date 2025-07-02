
import AuthForm from '@/components/AuthForm';

import {ReactNode} from 'react'

const AuthLayout
 = ({ children }: {
    children: ReactNode;
 }) => {
  return < AuthForm type="sign-in" />
}

export default AuthLayout
