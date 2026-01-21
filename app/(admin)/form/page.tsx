'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Link from 'next/link'
import { toast } from "sonner"
import clsx from "clsx"

type FormValues = {
  name: string
  mobileNumber: string
  email: string
  interest_Area: string
  Characterestics: string
}

export default function Formpage() {
  const router = useRouter()

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      mobileNumber: "",
      email: "",
      interest_Area: "",
      Characterestics: "",
    },
    mode: "onSubmit",
  })

  const {
    control,
    watch,
    formState: { errors },
  } = form

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const interestAreaValue = watch("interest_Area")

  /* ---------------- Suggestions ---------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      if (interestAreaValue && interestAreaValue.length >= 3) {
        fetchSuggestions(interestAreaValue)
      } else {
        setSuggestions([])
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [interestAreaValue])

  const fetchSuggestions = async (query: string) => {
    setLoadingSuggestions(true)
    try {
      const response = await fetch(
        `/api/getSuggestions?query=${encodeURIComponent(query)}`
      )
      const data = await response.json()
      setSuggestions(data)
    } catch {
      toast.error("Failed to fetch suggestions")
    } finally {
      setLoadingSuggestions(false)
    }
  }

  /* ---------------- Submit ---------------- */

  const onSubmit = async (values: FormValues) => {
    const toastId = toast.loading("Submitting form...", {
      description: "Please wait",
    })

    try {
      const response = await fetch('/api/saveform', {
        method: 'POST',
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Submission failed")
      }

      toast.success("Form submitted successfully", {
        description: "Redirecting...",
      })

      const query = new URLSearchParams({
        interest_Area: values.interest_Area,
        Characterestics: values.Characterestics,
      }).toString()

      router.replace(`/grade?${query}`)

    } catch (error: any) {
      toast.error("Submission failed", {
        description: error.message,
      })
    } finally {
      toast.dismiss(toastId)
    }
  }

  const handleSuggestionClick = (value: string) => {
    form.setValue("interest_Area", value)
    setSuggestions([])
    toast.info("Suggestion selected")
  }

  /* ---------------- UI ---------------- */

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, () => {
          toast.warning("Please fill all mandatory fields", {
            description: "Highlighted fields are required",
          })
        })}
        className="space-y-5"
      >
        <div className="container mx-auto p-2">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-blue-800">
              Petrochemical Interest Form
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Fields marked * are mandatory
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* NAME */}
            <FormField
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your full name"
                      className={clsx(
                        errors.name && "border-red-500 ring-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* MOBILE */}
            <FormField
              control={control}
              name="mobileNumber"
              rules={{
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid 10-digit mobile number",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={clsx(
                        errors.mobileNumber && "border-red-500 ring-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* EMAIL */}
            <FormField
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="example@company.com"
                      className={clsx(
                        errors.email && "border-red-500 ring-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* INTEREST AREA */}
            <FormField
              control={control}
              name="interest_Area"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Products / Application</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Furniture, Toys, Packaging etc."
                    />
                  </FormControl>

                  {loadingSuggestions && (
                    <p className="text-blue-500 text-sm">Searching...</p>
                  )}

                  {suggestions.length > 0 && (
                    <ul className="absolute z-50 bg-white border w-full rounded shadow">
                      {suggestions.map((s, i) => (
                        <li
                          key={i}
                          onClick={() => handleSuggestionClick(s)}
                          className="p-2 hover:bg-blue-50 cursor-pointer"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </FormItem>
              )}
            />

            {/* CHARACTERISTICS */}
            <FormField
              control={control}
              name="Characterestics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specific Characteristics</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="High strength, flexibility, UV resistance etc."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex gap-4">
            <Link href="/" className="w-full">
              <Button className="w-full bg-blue-500">Back</Button>
            </Link>
            <Button type="submit" className="w-full bg-green-600">
              Submit
            </Button>
          </CardFooter>
        </div>
      </form>
    </FormProvider>
  )
}
