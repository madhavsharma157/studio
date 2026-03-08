import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { School, MapPin, Plus, List } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'school-hero');
  const mapImage = PlaceHolderImages.find(img => img.id === 'location-map');

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-primary">
      {/* Navigation */}
      <nav className="bg-primary border-b border-primary-foreground/10 py-4 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-accent rounded-lg group-hover:scale-110 transition-transform">
              <School className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-primary-foreground tracking-tight">GeoCampus</span>
          </Link>
          <div className="flex gap-4">
            <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80">
              <Link href="/list">Explore</Link>
            </Button>
            <Button asChild className="bg-accent text-primary-foreground hover:bg-accent/90">
              <Link href="/add">Add School</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl h-[400px] bg-primary">
          {heroImage?.imageUrl ? (
            <Image 
              src={heroImage.imageUrl} 
              alt="School Campus" 
              fill 
              className="object-cover opacity-60"
              priority
              data-ai-hint="modern school"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex flex-col justify-center px-12 text-white">
            <h1 className="text-5xl font-extrabold mb-4 font-headline leading-tight max-w-2xl">
              Locate & Manage Educational Hubs Effortlessly
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl">
              Add new institutions to our growing database and find the nearest learning centers using advanced geospatial calculations.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild className="bg-accent text-primary-foreground border-none hover:bg-accent/90">
                <Link href="/add" className="flex items-center gap-2">
                  <Plus className="h-5 w-5" /> Get Started
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link href="/list" className="flex items-center gap-2">
                  <List className="h-5 w-5" /> View Schools
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-all border-none bg-white">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Add Schools</CardTitle>
              <CardDescription>Register new educational institutions with precise coordinates and details.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all border-none bg-white">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle className="font-headline">Smart Discovery</CardTitle>
              <CardDescription>Instantly find schools sorted by proximity to your current physical location.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all border-none bg-white">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <NavigationIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Geo-Optimization</CardTitle>
              <CardDescription>Haversine algorithms ensure pinpoint accuracy in distance calculations.</CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Info Section */}
        <section className="mt-20 flex flex-col md:flex-row items-center gap-12 bg-white p-12 rounded-3xl shadow-sm">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold font-headline text-primary">Academic Intelligence at your fingertips</h2>
            <p className="text-muted-foreground leading-relaxed">
              GeoCampus Manager is designed for city planners, parents, and researchers. Our platform provides a robust API-first approach to school management, allowing for seamless integration with other geospatial tools.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>Real-time distance sorting</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>Standardized school data entry</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>Postman-ready API endpoints</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 relative w-full h-[300px] rounded-2xl overflow-hidden shadow-inner bg-muted">
             {mapImage?.imageUrl ? (
               <Image 
                  src={mapImage.imageUrl} 
                  alt="Location Map" 
                  fill 
                  className="object-cover opacity-80"
                  data-ai-hint="map location"
               />
             ) : null}
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <School className="h-6 w-6 text-primary" />
            <span className="font-bold text-primary">GeoCampus Manager</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Node JS Assignment. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/api/listSchools?latitude=19.0760&longitude=72.8777" className="text-sm text-primary hover:underline">API Docs</Link>
            <Link href="https://github.com" className="text-sm text-primary hover:underline">Source Code</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavigationIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="m3 11 19-9-9 19-2-8-8-2Z" />
    </svg>
  );
}
