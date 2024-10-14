'use client'
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Logo from "@/ic_logo.gif";
import PropelImage from "@/propel_new.jpg";
import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '@/lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function Component() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            mobileNumber: "123",
            email: "",
            interest: "",
            interest_Area:""
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Convert mobileNumber from string to number
       

        console.log("Form submitted:", values);
        alert("Form submitted");
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div
                    className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4"
                    style={{ backgroundImage: "url('/pic_bg.png')" }}
                >
                    <div className="absolute top-4 left-4">
                        <Link href="/">
                            <img src='/ic_logo.gif' alt="Company Logo" className="h-24" />
                        </Link>
                    </div>
                    <Card className="container mx-auto px-4 py-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg max-w-5xl relative z-10">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-center">Petrochemical Interest Form</CardTitle>
                            <CardDescription className="text-center text-xl">Please enter your details to learn more about petrochemical grades</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
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
                                                type="text" // Change this to text to capture digits
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
                                        <FormLabel className="text-lg">Interest Area</FormLabel>
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
                            <div className="space-y-2">
                                <Label htmlFor="interest" className="text-lg">Area of Interest</Label>
                                <Select {...form.register("interest")}>
                                    <SelectTrigger id="interest">
                                        <SelectValue placeholder="Select your area of interest" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="polymers">Polymers (e.g., PE, PP, PVC)</SelectItem>
                                        <SelectItem value="aromatics">Aromatics (e.g., Benzene, Toluene, Xylene)</SelectItem>
                                        <SelectItem value="olefins">Olefins (e.g., Ethylene, Propylene)</SelectItem>
                                        <SelectItem value="solvents">Solvents (e.g., Acetone, MEK)</SelectItem>
                                        <SelectItem value="other">Other Petrochemicals</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full text-lg bg-green-200" disabled={isPending}>Submit</Button>
                        </CardFooter>
                    </Card>
                    <div className="absolute top-4 right-4">
                        <img src='/propel_new.jpg' alt="Propel Image" className="h-24" />
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}
