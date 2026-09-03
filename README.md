
# E-CELL BAREILLY COLLEGE

> **Think Beyond. Build Beyond.**

A professional website for **E-Cell, Bareilly College** built to promote entrepreneurship, innovation, student participation, events, collaboration and the entrepreneurial ecosystem.

---

## 🌐 About The Project

**E-Cell Bareilly College** is a student-focused digital platform designed to provide information about the E-Cell, its activities, events, team, vision, mission and opportunities for students.

The website also allows students to:

- Join E-Cell
- Submit applications
- Contact the E-Cell team
- Explore events
- Explore the E-Cell team
- View the gallery
- Learn about entrepreneurship and innovation

---

## ✨ Features

### 🏠 Home
Professional landing page with the identity:

**THINK BEYOND. BUILD BEYOND.**

### 📖 About E-Cell
Includes:

- About E-Cell
- Vision
- Mission
- Impact

### 💡 What We Do

The platform highlights:

- Entrepreneurship Awareness
- Innovation
- Startup Culture
- Workshops
- Student Community
- Networking
- Mentorship
- Idea Development

### 📅 Events

Events are loaded dynamically from the backend API.

### 👥 Team

The E-Cell team is dynamically loaded from the backend.

Current team:

| Name | Role |
|---|---|
| Richa Joshi | President |
| Devansh Saxena | Vice President |
| Satyam Rastogi | Secretary |
| Neelam Gupta | Finance & Documentation Head |
| Raghav Gupta | Event Management Head |
| Ishita Singh Tomar | Public Relations & Marketing Head |
| Arpit Sharma | Technical & Innovation Head |

### 🖼️ Gallery

A dedicated section for E-Cell activities, workshops, events and memorable moments.

### 🤝 Join E-Cell

Students can apply to join E-Cell by submitting:

- Name
- Email
- Phone
- Course
- Year / Semester
- Area of Interest
- Message

Applications are processed through the backend and email notification is sent to the administrator.

### 📩 Contact

Visitors can send:

- Queries
- Suggestions
- Collaboration requests
- Partnership opportunities
- General messages

Contact messages are stored through the backend and email notification is sent to the administrator.

### 📱 Responsive Design

The website is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🛠️ Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript
- Responsive CSS
- Vanilla JavaScript

## Backend

- Node.js
- Express.js
- CORS
- Nodemailer

## Data Storage

The current version uses JSON files for storing data.

```text
server/data/
├── members.json
├── events.json
├── contacts.json
└── contactMessages.json

Email

Gmail SMTP

Nodemailer


Deployment

GitHub

Vercel

Render



---

📁 Project Structure

E-Cell-Bareilly-College/
│
├── client/
│   ├── index.html
│   ├── about.html
│   ├── events.html
│   ├── team.html
│   ├── gallery.html
│   ├── join.html
│   ├── contact.html
│   │
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   └── animations.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── events.js
│   │   ├── join.js
│   │   └── contact.js
│   │
│   └── assets/
│       ├── images/
│       │   ├── team/
│       │   ├── events/
│       │   └── gallery/
│       │
│       ├── logo/
│       └── icons/
│
├── server/
│   ├── server.js
│   ├── package.json
│   │
│   ├── data/
│   │   ├── members.json
│   │   ├── events.json
│   │   ├── contacts.json
│   │   └── contactMessages.json
│   │
│   ├── routes/
│   │   ├── memberRoutes.js
│   │   ├── eventRoutes.js
│   │   └── contactRoutes.js
│   │
│   └── controllers/
│       ├── memberController.js
│       ├── eventController.js
│       └── contactController.js
│
├── .gitignore
└── README.md


---

💻 Requirements

Before running the project, install:

Node.js

npm

Git

Visual Studio Code


Check Node.js:

node -v

Check npm:

npm -v

Check Git:

git --version


---

🚀 Run The Project Locally

Step 1 — Clone Repository

git clone https://github.com/Raghav335/E-Cell-Bareilly-College.git

Enter the project:

cd E-Cell-Bareilly-College


---

⚙️ Backend Setup

Go to the server folder:

cd server

Install dependencies:

npm install


---

🔐 Environment Variables

Create:

server/.env

Add:

EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=your-admin-email@gmail.com

Important

Never upload .env to GitHub.

The .gitignore file should contain:

node_modules/
.env


---

📧 Gmail Configuration

The project uses Gmail SMTP through Nodemailer.

A Gmail App Password should be used instead of the normal Gmail password.

The email system is used for:

Join E-Cell applications

Contact messages

Administrator notifications


Never publish your Gmail App Password.


---

▶️ Start Backend

Inside the server folder:

npm start

For development:

npm run dev

Backend will run on:

http://localhost:5000


---

🌐 Open Website

Open:

http://localhost:5000

API:

http://localhost:5000/api


---

🔌 API Endpoints

API Status

GET /api

Team Members

GET /api/members

Events

GET /api/events

Join Applications

GET /api/contacts

Submit application:

POST /api/contacts

Contact Messages

Get messages:

GET /api/contacts/message

Submit message:

POST /api/contacts/message


---

📦 Example Join Application

{
  "name": "Student Name",
  "email": "student@gmail.com",
  "phone": "9876543210",
  "course": "BCA",
  "year": "4th Semester",
  "interest": "Technology",
  "message": "I want to join E-Cell Bareilly College."
}


---

📦 Example Contact Message

{
  "name": "Student Name",
  "email": "student@gmail.com",
  "subject": "Collaboration",
  "message": "I would like to collaborate with E-Cell."
}


---

🗂️ Data Files

Team data:

server/data/members.json

Events:

server/data/events.json

Join applications:

server/data/contacts.json

Contact messages:

server/data/contactMessages.json


---

🖼️ Images

Team images:

client/assets/images/team/

Event images:

client/assets/images/events/

Gallery images:

client/assets/images/gallery/


---

☁️ Deployment Architecture

GitHub
                       │
             ┌─────────┴─────────┐
             │                   │
           Vercel              Render
             │                   │
         Frontend             Backend
          client               server
                                 │
                      ┌──────────┴──────────┐
                      │                     │
                   JSON Data              Gmail
                                      Nodemailer


---

🟣 Vercel Deployment

Import the GitHub repository into Vercel.

Use:

Framework Preset: Other
Root Directory: client
Build Command: Leave blank
Output Directory: Leave blank

Then deploy.

The frontend communicates with the Render backend.


---

🟠 Render Deployment

Create a new Web Service using the GitHub repository.

Configuration:

Name:
e-cell-bareilly-college

Language:
Node

Branch:
main

Root Directory:
server

Build Command:
npm install

Start Command:
npm start

Add environment variables:

EMAIL_USER
EMAIL_APP_PASSWORD
ADMIN_EMAIL


---

🌍 Backend

Production backend:

https://e-cell-bareilly-college.onrender.com

API:

https://e-cell-bareilly-college.onrender.com/api

Team API:

https://e-cell-bareilly-college.onrender.com/api/members

Events API:

https://e-cell-bareilly-college.onrender.com/api/events

Join API:

https://e-cell-bareilly-college.onrender.com/api/contacts

Contact API:

https://e-cell-bareilly-college.onrender.com/api/contacts/message


---

🔄 Development Workflow

Make Changes
     ↓
Test Locally
     ↓
Test API
     ↓
Test Forms
     ↓
Test Email
     ↓
git add .
     ↓
git commit
     ↓
git push
     ↓
Vercel + Render Deployment


---

🧪 Testing Checklist

Frontend

[ ] Home page

[ ] Navigation

[ ] Mobile menu

[ ] About section

[ ] What We Do

[ ] Events

[ ] Team

[ ] Gallery

[ ] Join E-Cell

[ ] Contact


Backend

[ ] API status

[ ] Members API

[ ] Events API

[ ] Join API

[ ] Contact API


Email

[ ] Join application email

[ ] Contact message email

[ ] Reply-to functionality


Deployment

[ ] GitHub

[ ] Vercel

[ ] Render

[ ] Production API

[ ] Production forms



---

🎯 Vision

To build a student-driven entrepreneurial ecosystem at Bareilly College where ideas are encouraged, innovation is nurtured and students are empowered to create meaningful impact.


---

🚀 Mission

E-Cell Bareilly College aims to:

Promote entrepreneurship

Encourage innovation

Develop entrepreneurial skills

Conduct workshops and awareness sessions

Build a strong student community

Connect students with opportunities

Encourage students to transform ideas into impact



---

🔮 Future Improvements

Possible future upgrades:

Admin Dashboard

Student Login

Admin Authentication

Event Registration

Event Management

Member Management

Database Integration

Cloud Image Storage

Analytics Dashboard

Newsletter System

Certificate Generation

Startup / Idea Submission

Mentorship Registration



---

⚠️ Current Storage Limitation

The current version stores data in JSON files.

This is suitable for:

College projects

Demonstrations

Hackathons

Initial prototypes

Small-scale testing


For a larger production system, a proper database such as MongoDB, PostgreSQL, MySQL or Supabase can be integrated.


---

🔒 Security

Never commit:

.env

Never publish:

Gmail App Password
API Keys
Passwords
Private Credentials

Always use environment variables for sensitive information.


---

🏫 E-CELL BAREILLY COLLEGE

Think Beyond. Build Beyond.

A student-driven initiative focused on:

Entrepreneurship • Innovation • Community • Impact


---

👨‍💻 Built With

HTML5
CSS3
JavaScript
Node.js
Express.js
Nodemailer
JSON
GitHub
Vercel
Render


---

📜 License

This project is developed for E-Cell, Bareilly College for educational, institutional and community purposes.


---

⭐ E-Cell Bareilly College — Think Beyond. Build Beyond.

