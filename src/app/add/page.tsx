
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { School, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function AddSchoolPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      latitude: parseFloat(formData.get('latitude') as string),
      longitude: parseFloat(formData.get('longitude') as string),
    };

    try {
      const response = await fetch('/api/addSchool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to add school');
      }

      setSuccess(true);
      toast({
        title: "School Added",
        description: `${data.name} has been successfully added to the database.`,
      });
      
      setTimeout(() => {
        router.push('/list');
      }, 2000);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center p-8">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-accent" />
          </div>
          <h2 className="text-2xl font-bold mb-2">School Added!</h2>
          <p className="text-muted-foreground mb-6">The school has been successfully registered. Redirecting to listing...</p>
          <Button asChild className="w-full">
            <Link href="/list">Go to Schools</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary rounded-xl">
              <School className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-extrabold text-primary font-headline">Register New School</h1>
          </div>
        </div>

        <Card className="border-none shadow-xl bg-white">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>Enter the basic details and geographic coordinates of the institution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">School Name</Label>
                <Input id="name" name="name" placeholder="e.g. Greenwood High School" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input id="address" name="address" placeholder="123 Education Lane, Downtown" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input 
                    id="latitude" 
                    name="latitude" 
                    type="number" 
                    step="any" 
                    placeholder="e.g. 19.0760" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input 
                    id="longitude" 
                    name="longitude" 
                    type="number" 
                    step="any" 
                    placeholder="e.g. 72.8777" 
                    required 
                  />
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                Tip: You can find latitude and longitude by right-clicking a location on Google Maps.
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary/90" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding School...
                  </>
                ) : (
                  'Add Institution'
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/list">Cancel</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
