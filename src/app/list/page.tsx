
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { School, MapPin, Search, Navigation, Loader2, ArrowUpDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SchoolItem {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export default function ListSchoolsPage() {
  const [schools, setSchools] = useState<SchoolItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: '', lon: '' });
  const [hasSearched, setHasSearched] = useState(false);

  async function fetchSchools(lat: string, lon: string) {
    if (!lat || !lon) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/listSchools?latitude=${lat}&longitude=${lon}`);
      if (!response.ok) throw new Error('Failed to fetch schools');
      const data = await response.json();
      setSchools(data);
      setHasSearched(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not retrieve the school list.",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchSchools(location.lat, location.lon);
  }

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude.toFixed(6), lon: longitude.toFixed(6) });
        fetchSchools(latitude.toString(), longitude.toString());
      },
      () => {
        toast({
          variant: "destructive",
          title: "Permission Denied",
          description: "Please allow location access to use this feature.",
        });
      }
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-xl mb-4 group">
              <School className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <span>GeoCampus</span>
            </Link>
            <h1 className="text-4xl font-extrabold text-primary font-headline">Discover Schools</h1>
            <p className="text-muted-foreground mt-2">Find the nearest educational institutions sorted by proximity.</p>
          </div>
          <Button asChild className="bg-accent text-primary-foreground hover:bg-accent/90">
            <Link href="/add" className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" /> Add New School
            </Link>
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="mb-12 border-none shadow-lg bg-white overflow-hidden">
          <form onSubmit={handleSearch} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <Label htmlFor="search-lat">Your Latitude</Label>
                <Input 
                  id="search-lat" 
                  value={location.lat} 
                  onChange={(e) => setLocation(prev => ({ ...prev, lat: e.target.value }))}
                  placeholder="e.g. 19.0760" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="search-lon">Your Longitude</Label>
                <Input 
                  id="search-lon" 
                  value={location.lon} 
                  onChange={(e) => setLocation(prev => ({ ...prev, lon: e.target.value }))}
                  placeholder="e.g. 72.8777" 
                  required 
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-primary" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                  Find Nearby
                </Button>
                <Button type="button" variant="outline" onClick={getCurrentLocation} title="Use my current location">
                  <NavigationIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Calculating distances...</p>
          </div>
        ) : hasSearched && schools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school, index) => (
              <Card key={school.id} className="group hover:shadow-xl transition-all border-none bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <div className="bg-accent/10 text-accent-foreground px-3 py-1 rounded-full text-xs font-bold border border-accent/20">
                    {school.distance.toFixed(2)} km
                  </div>
                </div>
                <CardHeader className="pt-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-primary/10">#{index + 1}</span>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {school.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 shrink-0 text-accent" />
                    <span>{school.address}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground font-mono bg-muted/30 p-2 rounded">
                    LAT: {school.latitude.toFixed(4)} | LON: {school.longitude.toFixed(4)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed">
            <School className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold">No schools found</h3>
            <p className="text-muted-foreground">Try adjusting your coordinates or add a new school.</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Enter your coordinates above to find the nearest campuses.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Hallucinated icon fixes
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  );
}

function NavigationIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 11 19-9-9 19-2-8-8-2Z"/></svg>
  );
}
