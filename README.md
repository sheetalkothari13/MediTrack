# Medix - Medication Management System

Medix is a modern web application built with Next.js for managing medications and prescriptions. It provides a user-friendly interface for tracking medications, viewing prescriptions, and managing user accounts.

## Features

- **User Authentication**
  - Secure login and registration system
  - JWT-based authentication
  - Protected routes

- **Medication Management**
  - Add and track medications
  - View medication details
  - Manage prescriptions

- **Modern Tech Stack**
  - Next.js 15 with App Router
  - React 19
  - TailwindCSS for styling
  - Prisma ORM for database management


## Getting Started

### Prerequisites

- Node.js (LTS version)
- pnpm package manager
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd medix
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="your-postgresql-connection-string"
   JWT_SECRET="your-jwt-secret"
   ```

4. Initialize the database:
   ```bash
   pnpx prisma generate
   pnpx prisma db push
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
medix/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   ├── context/           # React context providers
│   ├── medication/        # Medication management pages
│   ├── medicationRead/    # Medication viewing pages
│   ├── login/            # Authentication pages
│   └── register/         # User registration pages
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── ...config files
```

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
