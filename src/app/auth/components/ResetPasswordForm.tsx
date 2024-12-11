"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const FormSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
  })

  const simulateAPICall = () => new Promise(resolve => setTimeout(resolve, 2000))

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Invalid Reset Link",
        description: "Please request a new password reset link.",
        duration: 2000,
      })
      return
    }

    try {
      setIsLoading(true)
      await simulateAPICall()

      toast({
        title: "Reset Link Sent",
        description: "Your password has been reset.",
        className: "bg-green-500 text-white",
        duration: 2000,
      })

      setTimeout(() => {
        router.push("/auth/login")
      }, 4000)

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reset password. Please try again.",
        duration: 2000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const PasswordToggleButton = ({ show, onToggle }: { show: boolean, onToggle: () => void }) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
      onClick={onToggle}
    >
      {show ? (
        <EyeOff className="size-4 text-gray-500" />
      ) : (
        <Eye className="size-4 text-gray-500" />
      )}
    </Button>
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password" 
                    {...field} 
                  />
                  <PasswordToggleButton 
                    show={showPassword} 
                    onToggle={() => setShowPassword(!showPassword)} 
                  />
                </div>
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password" 
                    {...field} 
                  />
                  <PasswordToggleButton 
                    show={showConfirmPassword} 
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)} 
                  />
                </div>
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              Resetting Password
              <LoaderCircle className="ml-2 size-4 animate-spin" />
            </>
          ) : (
            "Reset Password"
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