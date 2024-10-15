'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
//import { useTransition } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';

export default function Formpage() {
   // const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            name: "",
            mobileNumber: "+91",
            email: "",
            interest: "",
            interest_Area: "",
            Characterestics: ""
        },
    });

    const [suggestions, setSuggestions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);

    const onSubmit = async (values: { interest_Area: any; Characterestics: any; }) => {
        console.log("Form submitted successfully:", values);
        try {
            const response = await fetch('/api/saveform', {
                method: 'POST',
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Form submitted successfully:", data);

            const query = new URLSearchParams({
                interest_Area: values.interest_Area || '',
                Characterestics: values.Characterestics || '',
            }).toString();

            router.replace(`/grade?${query}`);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again.");
        }
    };

    const handleInterestAreaChange = async (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        form.setValue("interest_Area", value);

        if (value) {
            setLoadingSuggestions(true);
            try {
                const response = await fetch(`/api/getSuggestions?query=${encodeURIComponent(value)}`);
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            } finally {
                setLoadingSuggestions(false);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        form.setValue("interest_Area", suggestion);
        setSuggestions([]); // Clear suggestions after selecting one
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="container mx-auto p-1">
                    <CardHeader>
                        <CardTitle className="text-5xl font-bold text-center text-blue-800">Petrochemical Interest Form</CardTitle>
                        <CardDescription className="text-center text-xl text-slate-800">Please enter your details to learn more about petrochemical grades</CardDescription>
                        <hr />
                    </CardHeader>
                    <CardContent className="space-y-4 text-xl">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your name"
                                            {...field}
                                            type="text"
                                            //disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mobileNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">Mobile Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your mobile number"
                                            {...field}
                                            //disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">Email ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email address"
                                            {...field}
                                           // disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="interest_Area"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">Products/Application</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Interest Area e.g Furniture, toys etc"
                                            {...field}
                                            onChange={handleInterestAreaChange}
                                           // disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    {loadingSuggestions && <p>Loading...</p>}
                                    {suggestions.length > 0 && (
    <ul className="absolute bg-white border mt-1 rounded shadow">
        {suggestions.map((suggestion, index) => (
            <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-200"
            >
                {suggestion} {/* This is now a string, so it should render correctly */}
            </li>
        ))}
    </ul>
)}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Characterestics"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">Any specific characteristics</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Characterestics"
                                            {...field}
                                            //disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className='flex gap-x-6'>
                        
                    <Link href="/" className='w-full'>
                            <Button className="w-full p-6 text-xl font-bold text-zinc-100 bg-blue-500">
                                Back
                            </Button>
                        </Link>
                        <Button type="submit" className="w-full p-6 text-xl font-bold text-zinc-100 bg-green-500 " size={"lg"} 
                        //disabled={isPending}
                        >Submit</Button>
                    </CardFooter>
                </div>
            </form>
        </FormProvider>
    );
}
