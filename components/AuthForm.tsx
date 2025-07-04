"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from 'next/image';
import Link from 'next/link';
import { toast } from "sonner"
import { auth } from "@/firebase/client"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"

//import { Input } from "@components/ui/input";  
import FormField from "./FormField";
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { signIn, signUp } from "@/lib/actions/auth.action"


const authFormSchema = (type: FormType ) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(1, "Name is required") : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 3 characters"),
  })
}

const AuthForm = ({type}: {type :FormType}) => {
  const router = useRouter()
  //const form =useForm<z.infer<typeof formSchema>>({
    //defaultValues: {
  //  },
  //})

  const formSchema = authFormSchema(type);
     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {

    try{

      if(type === "sign-up") {
        const {name , email, password} = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
        })

        if(!result?.success){
          toast.error(result?.message);
          return;

        }
        toast.success("Account created successfully! , Please sign in to continue.");
        router.push("/sign-in");
        // Handle sign-in logic here
        //console.log("SIGN-UP", values);
      }
      else
      {

         const { email, password } = values;

                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                const idToken = await userCredential.user.getIdToken();

                if(!idToken) {
                    toast.error('Sign in failed')
                    return;
                }

                const result = await signIn({
                    email, idToken
                })

                if(!result?.success) {
                  toast.error(result?.message);
                  return;
                }

        toast.success("Signed in successfully!");
        router.push("/");
        // Handle sign-up logic here
        console.log("SIGN-IN", values);
      }

    }catch(error: any){
      console.log(error);
      
      // Handle specific Firebase Auth errors
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please sign in instead.');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password is too weak. Please choose a stronger password.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address.');
      } else if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email. Please sign up first.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-credential') {
        toast.error('Invalid credentials. Please check your email and password.');
      } else {
        toast.error(`There was an error, something went wrong: ${error.message || error}`);
      }
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const isSignIn= type === "sign-in";

    
  return (
    <div className="card-border lg: min-w-[566px] ">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
<Image src="/logo.svg" alt="Logo" width={38} height={32} />
    <h2 className="text-primary-100">AcePrep</h2>
                </div>
                <h3> Practice job interview with AI</h3>
            
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form ">

 {!isSignIn && (
  <FormField
    control={form.control}
    name="name"
    label="Name"
    placeholder="Enter your name"/>
 )
 }
  <FormField
    control={form.control}
    name="email"
    label="Email"
    placeholder="Enter your email"
    type="email"/>

  <FormField
    control={form.control}
    name="password"
    label="Password"
    placeholder="Enter your password"
    type="password"/>

        <Button className="btn" 
        type="submit">{isSignIn ? "Sign In" : "Create an Account"}</Button>
      </form>
    </Form>
    <p className="text-center">
      {isSignIn ? "Don't have an account?" : "Already have an account?"}
      <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">
        {!isSignIn ? " Sign In" : " Sign Up"}
      </Link>
    </p>
    
    
    </div>
    </div>
  )
}

export default AuthForm;