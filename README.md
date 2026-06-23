# AI Travel Planner

An AI-powered travel planning application that generates personalized travel itineraries based on user preferences such as destination, trip duration, budget, and interests.

## Features

- Generate AI-powered travel itineraries
- Day-by-day travel plans
- Budget estimation
- Dynamic itinerary modification
- Weather information integration
- Responsive user interface
- Secure API handling using environment variables

## Tech Stack

### Frontend
- Next.js
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### AI Integration
- OpenAI API

## Project Structure

```
ai-travel-planner/
│
├── client/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── package.json
│
├── .gitignore
├── README.md
└── .env.example
```

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/ai-travel-planner.git
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

## Environment Variables

Create a `.env` file in the server directory.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_secret_key
```

## Running the Application

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

Application will be available at:

```
http://localhost:3000
```
