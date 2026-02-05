'use client'

import { useState, useEffect, useRef } from 'react'
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

  // State to track if the form has been successfully submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userName');
      console.log('sessionStorage cleared on Formpage load.');
    }
  }, []);

  const {
    control,
    watch,
    formState: { errors },
    setValue,
  } = form

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [selectedInputValue, setSelectedInputValue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsContainerRef = useRef<HTMLDivElement>(null);

  const interestAreaValue = watch("interest_Area")

  useEffect(() => {
    if (interestAreaValue === selectedInputValue || !interestAreaValue || interestAreaValue.length < 3) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }

    if (interestAreaValue !== selectedInputValue && selectedInputValue !== null) {
        setSelectedInputValue(null);
    }

    const timer = setTimeout(() => {
      if (interestAreaValue && interestAreaValue.length >= 3) {
        fetchSuggestions(interestAreaValue)
      } else {
        setSuggestions([])
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [interestAreaValue, selectedInputValue])

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
      toast.dismiss(toast.loading("Failed to fetch suggestions"))
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsContainerRef.current && !suggestionsContainerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [suggestionsContainerRef]);

  const extractGradeApplication = (suggestion: string): string => {
    const parts = suggestion.split(' - ');
    if (parts.length > 0) {
      return parts[parts.length - 1].trim();
    }
    return suggestion;
  };

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

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('userEmail', values.email);
        sessionStorage.setItem('userName', values.name);
        console.log('New user email and name stored in sessionStorage:', values.email, values.name);
      }

      toast.success("Form submitted successfully", {
        description: "Redirecting...",
      })

      // Set isSubmitted to true on successful submission
      setIsSubmitted(true);

      const gradeApplicationToSend = extractGradeApplication(values.interest_Area);

      const query = new URLSearchParams({
        interest_Area: gradeApplicationToSend,
        Characterestics: values.Characterestics,
      }).toString()

      // Redirect after a short delay to allow the user to see the button change
      setTimeout(() => {
        router.replace(`/grade?${query}`)
      }, 500); // 0.5 second delay

    } catch (error: any) {
      toast.error("Submission failed", {
        description: error.message,
      })
    } finally {
      toast.dismiss(toastId)
    }
  }

  const handleSuggestionClick = (value: string) => {
    setValue("interest_Area", value, { shouldValidate: true });
    setSelectedInputValue(value);
    setSuggestions([]);
    inputRef.current?.blur();
    toast.info("Suggestion selected");
  }

  return (
       <div className="mt-8">
      <FormProvider {...form}>
        <form className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit, () => {
            toast.warning("Please fill all mandatory fields", {
              description: "Highlighted fields are required",
            })
          })}
          
        >
          <div className="container mx-auto p-4 bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-center text-white">
                Petrochemical Interest Form
              </CardTitle>
              <CardDescription className="text-center text-lg text-orange-400">
                Fields marked * are mandatory
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* NAME */}
              <FormField
                control={control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg font-medium">
                      Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your full name"
                        className={clsx(
                          "h-14 text-lg",
                          errors.name && "border-red-500 ring-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 w-full">

                {/* MOBILE */}
                <div className="flex-1">
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
                        <FormLabel className="text-white text-lg font-medium">
                          Mobile Number *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            className={clsx(
                              "h-14 text-lg",
                              errors.mobileNumber && "border-red-500 ring-red-500"
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* EMAIL */}
                <div className="flex-1">
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
                        <FormLabel className="text-white text-lg font-medium">
                          Email *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="example@company.com"
                            className={clsx(
                              "h-14 text-lg",
                              errors.email && "border-red-500 ring-red-500"
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* INTEREST AREA */}
              <FormField
                control={control}
                name="interest_Area"
                render={({ field }) => (
                  <FormItem className="relative" ref={suggestionsContainerRef}>
                    <FormLabel className="text-white text-lg font-medium">
                      Products / Application
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        ref={inputRef}
                        placeholder="Furniture, Toys, Packaging etc."
                        className="h-14 text-lg"
                      />
                    </FormControl>

                    {loadingSuggestions && (
                      <p className="text-blue-500 text-sm mt-1">Searching...</p>
                    )}

                    {suggestions.length > 0 && interestAreaValue !== selectedInputValue && (
                      <ul className="absolute z-50 bg-white border w-full rounded shadow mt-1">
                        {suggestions.map((s, i) => (
                          <li
                            key={i}
                            onClick={() => handleSuggestionClick(s)}
                            className="p-3 hover:bg-blue-50 cursor-pointer text-lg"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </FormItem>
                )}
              />

            </CardContent>

             <CardFooter className="mt-8 flex justify-center gap-6">
                {/* Back Button */}
                <Link href="/">
                    <div className="bg-gradient-to-b from-[#f36f21] to-[#ffd6be]
                        w-[220px] md:w-[300px]
                        h-[70px] md:h-[96px]
                        flex items-center justify-center
                        rounded-[20px]
                        shadow-[0px_0px_24px_0px_rgba(0,0,0,0.14)]
                        cursor-pointer
                        transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg
                        hover:border-2 hover:border-[#002480]">
                        <p className="font-bold text-[#002480] text-[24px] md:text-[32px]">
                            Back
                        </p>
                    </div>
                </Link>

                {/* Submit Button */}
                <button type="submit" disabled={isSubmitted}> {/* Disable button after submission */}
                    <div className={clsx(
                        "w-[220px] md:w-[300px] h-[70px] md:h-[96px] flex items-center justify-center rounded-[20px]",
                        "shadow-[0px_0px_24px_0px_rgba(0,0,0,0.14)] cursor-pointer transition-all duration-300 ease-in-out",
                        "", // Default border for consistency
                        isSubmitted
                          ? "bg-[#E5E0E0] hover:scale-100 hover:shadow-lg hover:border-transparent" // Submitted state styles
                          : "bg-gradient-to-b from-[#f36f21] to-[#ffd6be] hover:scale-105 hover:shadow-lg hover:border-2 hover:border-[#002480]" // Default/hover styles
                    )}>
                        <p className={clsx(
                            "font-bold text-[24px] md:text-[32px]",
                            isSubmitted ? "text-white" : "text-[#002480]"
                        )}>
                            Submit
                        </p>
                    </div>
                </button>
            </CardFooter>

          </div>
        </form>
      </FormProvider>
    </div>
  )
}