# GuestBook

AI-Powered Guest Feedback Intelligence Platform for Homestay Businesses.

---

## Project Description

GuestBook is a full-stack web application that helps homestay owners and property managers manage and analyze guest reviews from platforms such as Google Reviews, Booking.com, and TripAdvisor.

The platform stores guest reviews in a MongoDB database and presents them through an interactive dashboard, allowing users to search, filter, and manage feedback efficiently. Future AI integration using the Gemini API will enable sentiment analysis, theme detection, review summarization, response suggestions, and sarcasm detection.

---

# Key Features

- View guest reviews through an interactive dashboard
- Search reviews using keyword-based search
- Filter reviews by category, sentiment, and rating
- Create new guest reviews
- Update existing reviews
- Delete guest reviews
- Dashboard statistics for review analytics
- Homepage dashboard preview
- Responsive user interface built with Next.js
- MongoDB Atlas database integration
- REST API built with FastAPI
- Dark mode support

---

# Tech Stack

## Frontend

- Next.js
- React.js
- Tailwind CSS

## Backend

- FastAPI
- Python
- Pydantic

## Database

- MongoDB Atlas
- PyMongo

## AI Integration (Planned)

- Google Gemini API
- Sentiment Analysis
- Theme Detection
- AI-generated Response Suggestions
- Review Summarization
- Sarcasm Detection

---

# Why MongoDB?

MongoDB Atlas was selected because it is well suited for applications that manage semi-structured textual data like guest reviews.

Advantages include:

- Flexible document-based schema for review data
- Easy storage of large text fields without complex normalization
- JSON-like BSON documents integrate naturally with FastAPI
- Highly scalable cloud database
- Simple integration using PyMongo
- Suitable for storing future AI-generated fields such as summaries, response suggestions, detected themes, and sentiment labels

---

# Database Schema

The following schema represents the core database structure used by GuestBook. It illustrates the relationships between users, properties, guest reviews, AI analysis results, and detected review themes.

![Database Schema](assets/schema-diagram.png)

---

# Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
MONGO_URI=your_mongodb_connection_string
DATABASE_NAME=guestbook
COLLECTION_NAME=reviews
```

Create a `.env.local` file in the project root for the frontend.

Example:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```
The repository also includes a `.env.example` file containing the required environment variables with placeholder values.

---

# Project Setup

## 1. Clone the repository

```bash
git clone https://github.com/AbhijayChaudhary/guest-feedback-intelligence-platform.git
```

```bash
cd guest-feedback-intelligence-platform
```

---

## 2. Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

```bash
python3 -m venv .venv
```

Activate the virtual environment.

### macOS / Linux

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

Install the required packages.

```bash
pip install -r requirements.txt
```

Start the FastAPI server.

```bash
uvicorn main:app --reload
```

The backend server will run at:

```
http://127.0.0.1:8000
```

Swagger API documentation:

```
http://127.0.0.1:8000/docs
```

---

## 3. Frontend Setup

Open another terminal.

Install dependencies.

```bash
npm install
```

Start the Next.js development server.

```bash
npm run dev
```

The frontend runs at:

```
http://localhost:3000
```

---

## Database Setup

Create a free MongoDB Atlas cluster.

Create a database (for example: `guestbook`).

Create a collection named `reviews`.

Copy your MongoDB connection string.

Inside the `backend` folder, create a `.env` file using the variables shown in `.env.example`.

Example:

```env
MONGO_URI=your_mongodb_connection_string
DATABASE_NAME=guestbook
COLLECTION_NAME=reviews
```

Start the backend server:

```bash
cd backend
source .venv/bin/activate      # macOS/Linux

# or

.venv\Scripts\activate         # Windows

uvicorn main:app --reload
```

On startup, the application will automatically connect to MongoDB Atlas and seed the database with sample reviews if the collection is empty.

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/reviews/` | Get all reviews |
| GET | `/api/reviews/{id}` | Get review by ID |
| GET | `/api/reviews/search?q=` | Search reviews |
| POST | `/api/reviews/` | Create a review |
| PUT | `/api/reviews/{id}` | Update a review |
| DELETE | `/api/reviews/{id}` | Delete a review |

---

# Project Structure

```
GuestBook/
│
├── app/                  # Next.js App Router pages
├── backend/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── requirements.txt
│   └── main.py
│
├── components/           # Reusable UI components
├── context/              # Theme context
├── public/
├── assets/
│   └── schema-diagram.png
│
├── .env.example
├── package.json
└── README.md
```

---

# Future Enhancements

The following features are planned for future development:

- AI-powered sentiment analysis
- Theme detection using Gemini API
- AI-generated response suggestions
- Review summarization
- Sarcasm detection
- Property manager authentication
- Customer authentication
- Multi-property management
- Analytics dashboard with charts
- Review upload from CSV files
- Email notifications
- Export dashboard reports

---

# License

This project has been developed for educational and internship learning purposes.