"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" })
})

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
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
        title: "Reset Link Sent",
        description: "If an account exists with this email, you will receive password reset instructions.",
        className: "bg-green-500 text-white",
        duration: 4000,
      })
      
      setTimeout(() => {
        router.push("/auth/login")
      }, 4000)
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send reset link. Please try again.",
        duration: 2000,
      })
    } finally {
      setIsLoading(false)
    }
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

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              Sending Reset Link
              <LoaderCircle className="ml-2 size-4 animate-spin" />
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>

        <div className="text-center mt-4">
          <Link 
            href="/auth/login" 
            className="text-sm font-medium text-primary hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </Form>
  )
}