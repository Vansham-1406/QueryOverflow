# Query Overflow

Query Overflow is a platform for users to ask questions, provide answers, and engage in discussions on various topics. It is built with a modern tech stack, including React, Node.js, Express, GraphQL, and MongoDB.

# Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)

## Features

- **User Authentication:** Users can sign up, log in, and log out securely.
- **Asking Questions:** Users can post questions with titles, bodies, and optional code snippets.
- **Providing Answers:** Users can answer questions, including optional code and image attachments.
- **Tagging:** Questions can be tagged with relevant topics for easy categorization.
- **Real-time Updates:** Utilizes WebSocket for real-time updates on questions and answers.
- **Search Functionality:** Users can search for questions based on titles or tags.
- **User Profiles:** Each user has a profile displaying their asked questions, provided answers, and more.

## Getting Started

## Prerequisites

- Node.js: [Download Node.js](https://nodejs.org/)
- MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:
git clone https://github.com/Vansham-1406/QueryOverflow.git


3. Navigate to the project directory:
cd query-overflow


4. Install dependencies for the server:
cd server
npm install
Install dependencies for the client:

5. cd client
npm install
Usage
Start the server:

6. cd server
npm start

7. Start the client:
cd client
npm start
Open your browser and go to http://localhost:3000 to access Query Overflow.

## Tech Stack
Frontend: React, React Router
Backend: Node.js, Express.js, GraphQL (Apollo Server)
Database: MongoDB
Real-time Communication: WebSocket
Authentication: JWT (JSON Web Tokens)
Styling: CSS
State Management: Redux
Cloud Services: Cloudinary
Version Control: Git
