# **App Name**: GeoCampus Manager

## Core Features:

- Add School Endpoint: Receives school data (name, address, latitude, longitude) via POST, validates input, and stores it in the MySQL database.
- Input Data Validation: Ensures all incoming school data meets specified requirements (non-empty, correct data types) before database insertion, returning appropriate error messages on failure.
- List Schools Endpoint: Accepts user's latitude and longitude via GET parameters, fetches all schools, calculates geographical distances, and returns the list sorted by proximity.
- Geospatial Distance Calculation: Implements the Haversine formula to compute accurate geographical distances between the user's coordinates and each school's coordinates for sorting.
- MySQL Database Integration: Manages storage and retrieval of school records within the specified 'schools' table in the MySQL database.

## Style Guidelines:

- Primary color: Deep academic blue (#2E52B5) to convey professionalism, reliability, and an organized educational theme.
- Background color: A very light, subtle blue-gray (#F2F4F7) provides a clean, unobtrusive canvas that enhances readability in a light scheme.
- Accent color: Vibrant aqua (#3CCCE4) for call-to-actions, interactive elements, and key highlights, offering a modern and clear contrast.
- Body and headline font: 'Inter' (sans-serif) for its high legibility, modern aesthetic, and versatility across all text, from data tables to headings.
- Utilize clean, consistent vector-based icons, predominantly outline-style, to represent concepts like schools, locations (map pins), data entry, and sorting functions.
- Implement a structured and modular layout with an emphasis on clarity for data presentation (e.g., tabular listings for schools) and intuitive form design for adding new entries. Prioritize responsiveness for various screen sizes.
- Incorporate subtle and functional animations, such as smooth fade-ins for loaded content and discrete transitions for form submissions or when re-sorting school lists, avoiding distractions.