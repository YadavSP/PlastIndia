import * as zod from "zod";
export const formSchema = zod.object({
    name: zod.string().min(6, { message: "Name must be atleast two character" }),
    mobileNumber: zod.string().min(10, { message: "Mobile Number 10 digit is required" }),
    email: zod.string().min(2, { message: "Email ID is rerquired at least 2 character" }),
    interest: zod.string().min(1, { message: "Select atleast 1 area of interest" }),
    
    interest_Area: zod.string().min(6, { message: "Name must be atleast two character" }),

});