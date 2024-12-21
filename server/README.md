# Foxify Agency Backend

## Description
Backend API for Foxify Agency, a dynamic and responsive website for a leading agency. Built with Node.js, Express, and MongoDB.

## Setup Instructions

1. Install dependencies
```bash
npm install
```

2. Configure Environment Variables
Create a .env file in the root directory and add:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/foxify
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```

3. Run the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Documentation

### Authentication Routes
- POST /api/v1/auth/register - Register admin
- POST /api/v1/auth/login - Login admin
- GET /api/v1/auth/me - Get current admin
- PUT /api/v1/auth/updatedetails - Update admin details
- PUT /api/v1/auth/updatepassword - Update admin password

### Booking Routes
- GET /api/v1/bookings - Get all bookings
- GET /api/v1/bookings/:id - Get single booking
- POST /api/v1/bookings - Create new booking
- PUT /api/v1/bookings/:id - Update booking
- DELETE /api/v1/bookings/:id - Delete booking

### Service Routes
- GET /api/v1/services - Get all services
- GET /api/v1/services/:id - Get single service
- POST /api/v1/services - Create new service
- PUT /api/v1/services/:id - Update service
- DELETE /api/v1/services/:id - Delete service

### Testimonial Routes
- GET /api/v1/testimonials - Get all testimonials
- GET /api/v1/testimonials/:id - Get single testimonial
- POST /api/v1/testimonials - Create new testimonial
- PUT /api/v1/testimonials/:id - Update testimonial
- DELETE /api/v1/testimonials/:id - Delete testimonial

### Content Routes
- GET /api/v1/content - Get all content
- GET /api/v1/content/:id - Get single content
- POST /api/v1/content - Create new content
- PUT /api/v1/content/:id - Update content
- DELETE /api/v1/content/:id - Delete content

### Contact Routes
- GET /api/v1/contact - Get all contacts
- GET /api/v1/contact/:id - Get single contact
- POST /api/v1/contact - Create new contact
- PUT /api/v1/contact/:id - Update contact
- DELETE /api/v1/contact/:id - Delete contact
