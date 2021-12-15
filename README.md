# Car Booking App

## Run project

Requirements:
docker-compose
Steps:

1. Create .env file based on .env.example
2. Run docker-compose

```
docker-compose up -d
```

3. Go to http://localhost:8000

## Using

### Create a car

```
POST /cars
```

Body example:

```json
{
  "mark": "Volvo",
  "model": "S70",
  "VIN": "YV1LS55A3X1588402",
  "plate": "Y "
}
```

### Get all cars

```
GET /cars
```

### Get car by id

```
GET /cars/:id
```

### Get all bookings

```
GET /bookings
```

### Create booking

```
POST /booking
```

Body example:

```json
{
  "start": "2021-12-4",
  "end": "2021-12-12",
  "tariff": "0c792690-c8e5-4aff-a90c-71832ae2b171"
}
```
