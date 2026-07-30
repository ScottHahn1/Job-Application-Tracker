# CareerPier

## Overview

CareerPier is a full-stack job application tracker built with React, TypeScript, Node.js, Express, and MySQL. It helps job seekers organize and monitor their job applications through an intuitive Kanban board while providing secure authentication, application statistics, and a responsive user interface.

The goal of this project was to build a production-ready full-stack CRUD application with JWT authentication, protected routes, persistent login, and a modern frontend built with React, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Secure registration and login using JWT access and refresh tokens stored in HTTP-only cookies.
- **Application Tracking**: Create, view, and delete job applications with company name, job title, application date, and status.
- **Kanban Board**: Applications are automatically grouped into Applied, Interview, Offer, and Rejected columns.
- **Dashboard Statistics**: Displays total applications along with the percentage breakdown of each application status.
- **Demo Mode**: Visitors can explore the application without creating an account using demo data.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Protected Routes**: User data is only accessible after authentication with automatic token refreshing.

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Other:** TanStack Router, TanStack Query, JWT Authentication, REST API

## Run Locally

Clone the project

```bash
git clone https://github.com/ScottHahn1/CareerPier.git
```

Go to the project directory

```bash
cd CareerPier
```

Install client-side (frontend) dependencies

```bash
cd client
npm install
```

Start the frontend server

```bash
npm run dev
```

Install server-side (backend) dependencies

```bash
cd server
npm install
```

Create a `.env` file in the server directory and add the required environment variables.

Example:

```env
PORT=8888
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
NODE_ENV=development
```
npm run dev

```bash
npm run dev
```
