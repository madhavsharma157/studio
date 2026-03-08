
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { addSchoolToDb } from '@/lib/db';

const schoolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number({ required_error: "Latitude must be a number" }),
  longitude: z.number({ required_error: "Longitude must be a number" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = schoolSchema.parse(body);
    
    const newSchool = await addSchoolToDb(validatedData);
    
    return NextResponse.json({ 
      message: 'School added successfully', 
      school: newSchool 
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to add school' }, { status: 500 });
  }
}
