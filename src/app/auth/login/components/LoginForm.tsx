"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

const FormSchema = z.object({
 email: z.string().email({ message: "Invalid email address" }),
 password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
 rememberMe: z.boolean().default(false)
})

export default function LoginForm() {
 const [isLoading, setIsLoading] = useState(false)
 const [showPassword, setShowPassword] = useState(false)
 const { toast } = useToast()
 const router = useRouter()
 
 const form = useForm<z.infer<typeof FormSchema>>({
   resolver: zodResolver(FormSchema),
   defaultValues: {
     email: "",
     password: "",
     rememberMe: false
   },
 })

 const simulateAPICall = () => {
   return new Promise(resolve => setTimeout(resolve, 2000))
 }

 const onSubmit = async (data: z.infer<typeof FormSchema>) => {
   try {
     setIsLoading(true)
     await simulateAPICall()
     
     toast({
       title: "Login Successful",
       description: `Welcome back ${data.email}`,
       className: "bg-green-500 text-white",
       duration: 2000,
     })
     
     setTimeout(() => {
       router.push("/dashboard")
     }, 2000)
     
   } catch (error) {
     toast({
       variant: "destructive",
       title: "Error",
       description: "Failed to login. Please try again.",
       duration: 2000,
     })
   } finally {
     setIsLoading(false)
   }
 }

 const togglePasswordVisibility = () => {
   setShowPassword(!showPassword)
 }

 return (
   <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
       <FormField
         control={form.control}
         name="email"
         render={({ field, fieldState }) => (
           <FormItem>
             <FormLabel>Email</FormLabel>
             <FormControl>
               <Input placeholder="email@example.com" {...field} />
             </FormControl>
             <FormMessage>{fieldState.error?.message}</FormMessage>
           </FormItem>
         )}
       />
       <FormField
         control={form.control}
         name="password"
         render={({ field, fieldState }) => (
           <FormItem>
             <FormLabel>Password</FormLabel>
             <FormControl>
               <div className="relative">
                 <Input 
                   type={showPassword ? "text" : "password"}
                   autoComplete="on" 
                   placeholder="Password" 
                   {...field} 
                 />
                 <Button
                   type="button"
                   variant="ghost"
                   size="icon"
                   className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                   onClick={togglePasswordVisibility}
                 >
                   {showPassword ? (
                     <EyeOff className="size-4 text-gray-500" />
                   ) : (
                     <Eye className="size-4 text-gray-500" />
                   )}
                 </Button>
               </div>
             </FormControl>
             <FormMessage>{fieldState.error?.message}</FormMessage>
           </FormItem>
         )}
       />
       <div className="flex items-center justify-between">
         <FormField
           control={form.control}
           name="rememberMe"
           render={({ field }) => (
             <FormItem className="flex flex-row items-center space-x-2 space-y-0">
               <FormControl>
                 <Checkbox
                   checked={field.value}
                   onCheckedChange={field.onChange}
                 />
               </FormControl>
               <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                 Remember me
               </FormLabel>
             </FormItem>
           )}
         />
         <Link 
           href="/forgot-password" 
           className="text-sm font-medium text-primary hover:underline"
         >
           Forgot password?
         </Link>
       </div>
       <Button type="submit" disabled={isLoading} className="w-full">
         {isLoading ? (
           <>
             Login
             <LoaderCircle className="ml-2 size-4 animate-spin" />
           </>
         ) : (
           "Login"
         )}
       </Button>
     </form>
   </Form>
 )
}