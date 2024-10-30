import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phoneNumber: z.string().length(10, "Please enter a valid 10-digit phone number"),
    email: z.union([
        z.string().email("Please enter a valid email"),
        z.literal(""),
    ]),
    address: z.string().min(1, "Address is required"),
    password: z.string().min(3, "Password must be at least 6 characters long"),
    confirm_Password: z.string().min(3, "Confirm Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirm_Password, {
    message: "Passwords do not match",
    path: ["confirm_Password"],
});

export const licenceSchema = z.object({
    mandiType: z.string(),
    mandiState: z.string().optional(),
    madiDistrict: z.string().optional(),
    aadharNumber: z.string().min(12, 'Aadhar number must be 12 digits').regex(/^\d{12}$/, 'Invalid Aadhar number'),
    additionalNumber: z.string().optional(),
    currentLocation: z.string().min(1, 'Current location is required'),
    state: z.string().min(1, 'State is required'),
    district: z.string().min(1, 'District is required'),
    village: z.string().min(1, 'Village is required'),
    city: z.string().min(1, 'City is required'),
    pincode: z.string().min(6, 'Pincode must be 6 digits').max(6),
    work: z.string().min(1, 'Work is required'),
    income: z.string().min(1, 'Income is required'),
    storagePlace: z.string().min(1, 'Storage field is required'),
    storageLocation: z.string().min(1, 'Storage location is required'),
    aadharPhotos: z.array(z.string()).min(3, 'Upload front, back, and passport photos'),
    storageImages: z.array(z.string()).min(3, 'Upload at least 3 storage location photos'),
    declaration: z.boolean().refine(val => val === true, 'Declaration is required'),
    terms_condition: z.boolean().refine(val => val === true, 'Terms and conditions must be accepted')
}).refine(data => data.mandiType !== 'Mini Mandi' || (data.mandiState && data.madiDistrict), {
    message: "MiniMandi requires both state and district",
    path: ["mandiState", "madiDistrict"]
});