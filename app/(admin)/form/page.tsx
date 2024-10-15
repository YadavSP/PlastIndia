'use client';
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function Formpage() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            name: "",
            mobileNumber: "+91",
            email: "",
            interest: "",
            interest_Area: "",
            Characterestics:""
        },
    });

    const onSubmit = async (values: any) => {
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
    
             // Construct the query string manually
        const query = new URLSearchParams({
            interest_Area: values.interest_Area || '',
            Characterestics: values.Characterestics || '',
        }).toString();

        // Redirect to the grade page with query parameters
        router.replace(`/grade?${query}`);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again.");
        }
    };
    
    


    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
               
                    
            <div className="container mx-auto p-1">
               
            <CardHeader>
                            <CardTitle className="text-3xl font-bold text-center text-gray-800">Petrochemical Interest Form</CardTitle>
                            <CardDescription className="text-center text-xl">Please enter your details to learn more about petrochemical grades</CardDescription>
                            <hr/>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your name"
                                                {...field}
                                                type="text"
                                                disabled={isPending}
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
                                        <FormLabel className="text-lg">Mobile Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter your mobile number"
                                                {...field}
                                                disabled={isPending}
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
                                        <FormLabel className="text-lg">Email ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email address"
                                                {...field}
                                                disabled={isPending}
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
                                        <FormLabel className="text-lg">Required Application of Polymer Grade</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter your Interest Area"
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                              <FormField
                                control={form.control}
                                name="Characterestics"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Characterestics of Product</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter your Interest Area"
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                           
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full text-lg bg-green-200" disabled={isPending}>Submit</Button>
                        </CardFooter>
                    </div>
                   
                    
                   
               
            </form>
        </FormProvider>
    );
}
