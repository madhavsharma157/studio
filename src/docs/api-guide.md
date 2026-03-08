# GeoCampus Manager API Documentation

This document describes the available API endpoints for the GeoCampus Manager application.

## 1. Add School
**Endpoint:** `POST /api/addSchool`  
**Description:** Registers a new school in the database.

### Request Body
```json
{
  "name": "Greenwood High School",
  "address": "123 Education Lane, Downtown",
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

### Response (Success - 201)
```json
{
  "message": "School added successfully",
  "school": {
    "id": 5,
    "name": "Greenwood High School",
    "address": "123 Education Lane, Downtown",
    "latitude": 19.076,
    "longitude": 72.8777
  }
}
```

---

## 2. List Schools
**Endpoint:** `GET /api/listSchools`  
**Description:** Retrieves all schools sorted by proximity to the provided coordinates.

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `latitude` | float | Yes | Your current latitude |
| `longitude`| float | Yes | Your current longitude |

### Example Request
`GET /api/listSchools?latitude=19.0760&longitude=72.8777`

### Response (Success - 200)
```json
[
  {
    "id": 4,
    "name": "American School of Bombay",
    "address": "BKC, Mumbai",
    "latitude": 19.0619,
    "longitude": 72.8633,
    "distance": 2.15
  },
  ...
]
```
