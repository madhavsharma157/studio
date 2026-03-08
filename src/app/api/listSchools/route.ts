
import { NextResponse } from 'next/server';
import { getAllSchools } from '@/lib/db';
import { calculateDistance } from '@/lib/geo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userLat = parseFloat(searchParams.get('latitude') || '');
  const userLon = parseFloat(searchParams.get('longitude') || '');

  if (isNaN(userLat) || isNaN(userLon)) {
    return NextResponse.json({ error: 'Latitude and Longitude are required and must be valid numbers' }, { status: 400 });
  }

  try {
    const schools = await getAllSchools();
    
    const schoolsWithDistance = schools.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    }));

    // Sort by distance ascending
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    return NextResponse.json(schoolsWithDistance);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
  }
}
