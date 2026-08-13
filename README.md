# Major Project — Airbnb Clone

A full-stack web application inspired by Airbnb, built with Node.js, Express, MongoDB, and EJS. Users can browse property listings, view details on an interactive map, sign up/log in, create and manage their own listings, and leave reviews with star ratings.

**Live demo:** [major-project-giem.onrender.com](https://major-project-giem.onrender.com/listings)

## Features

- Browse and search property listings
- View detailed listing pages with images, pricing, location, and description
- Interactive location map powered by Google Maps
- User authentication (sign up, log in, log out) with Passport.js
- Create, edit, and delete your own listings (owner-only access)
- Leave reviews and star ratings on listings
- Delete your own reviews
- Flash messages for user feedback (success/error alerts)
- Responsive UI with Bootstrap

## Architecture

This project follows the **MVC (Model-View-Controller)** design pattern:

- **Model** (`model/`) — Mongoose schemas defining the structure of Listings, Reviews, and Users, and handling all database interactions.
- **View** (`view/`) — EJS templates responsible for rendering the UI and presenting data to the user.
- **Controller** (`controllers/`) — Contains the core logic for handling requests, interacting with models, and deciding which view to render.

Routes (`routes/`) map incoming HTTP requests to the appropriate controller functions, keeping the codebase modular, organized, and easy to maintain.

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- MongoDB Atlas (cloud database)

**Frontend**
- EJS (Embedded JavaScript templates)
- EJS-Mate (layout support)
- Bootstrap
- Custom CSS

**Authentication & Sessions**
- Passport.js (Local Strategy)
- express-session
- connect-mongo (session store)
- connect-flash (flash messages)

**Other**
- Google Maps API (location display)
- Method-override (PUT/DELETE via forms)

**Deployment**
- Render

## Project Structure

```
Major_Project/
├── controllers/       # Route logic (listing, review, user)
├── init/               # Database seed data
├── model/              # Mongoose schemas (listing, review, user)
├── routes/              # Express routers
├── view/                # EJS templates
│   ├── include/          # Partials (navbar, footer, flash)
│   ├── layouts/          # Boilerplate layout
│   ├── listings/          # Listing views (index, show, new, edit)
│   └── User/               # Auth views (login, signup)
├── public/              # Static assets (CSS, JS)
├── utils/                # Error handling utilities
├── schema.js             # Joi validation schemas
├── app.js                 # Main application entry point
└── package.json
```

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB Atlas account (or local MongoDB instance)
- A Google Maps API key

### Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd Major_Project
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   Atlas_Db=your_mongodb_atlas_connection_string
   SECRET=your_session_secret
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Start the server
   ```bash
   node app.js
   ```

5. Visit:https://major-project-giem.onrender.com/listings in your browser.
 
## Environment Variables

| Variable | Description |
|---|---|
| `Atlas_Db` | MongoDB Atlas connection string |
| `SECRET` | Secret key used for session signing |
| `GOOGLE_MAPS_API_KEY` | API key for Google Maps integration |

## Author

Nehal Rahangdale

## License

This project is for educational purposes as part of a B.Tech major project.
