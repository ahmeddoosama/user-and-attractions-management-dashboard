# User And Attractions Management Dashboard

A comprehensive dashboard application built with Angular 17 for managing Users, Attractions, and viewing Pet Sales Statistics.

## Project Overview

This application provides a robust management system for handling user data and attractions, featuring interactive data visualization, complete CRUD operations, and a responsive design optimized for all devices.

## Live Demo
[Demo Link](https://ahmeddoosama.github.io/user-and-attractions-management-dashboard)

## Key Features

- 📊 Interactive Dashboard with Real-time Statistics
- 👥 Complete User Management System
- 🎯 Attractions Management
- 📱 Fully Responsive Design
- 🔐 Authentication
- 📈 Dynamic Data Visualization using Chart.js
- 🎨 Modern UI with Angular Material and Tailwind CSS

## Project Structure

```
src/
├── app/
│   ├── core/                 # Core functionality
│   │   ├── guards/           # Authentication & route guards
│   │   ├── interceptors/     # HTTP interceptors
│   │   ├── interfaces/       # TypeScript interfaces
│   │   ├── models/           # Data models
│   │   └── services/         # Global services
│   │
│   ├── layout/             # Application layout components
│   │   ├── header/         # Main header component
│   │   ├── footer/         # Main footer component
│   │   ├── sidebar/        # Navigation sidebar
│   │   └── container/      # Main content container
│   │
│   ├── pages/              # Main application pages
│   │   ├── admin-profile/  # Admin profile management
│   │   ├── attractions/    # Attractions management
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Main dashboard
│   │   └── users/          # User management
│   │
│   └── shared/            # Shared resources
│       ├── components/    # Reusable components
│       └── utilities/     # Utility functions
│
├── assets/
│   ├── images/           # Image resources
│   └── styles/           # Global styles
│
├── environments/         # Environment configurations
└── tailwind.config.js    # Tailwind CSS configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Angular CLI (v17.2.1)
- npm (v9 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/ahmeddoosama/user-and-attractions-management-dashboard
```

2. Navigate to project directory
```bash
cd user-and-attractions-management-dashboard
```

3. Install dependencies
```bash
npm install --force
```

4. Start development server
```bash
ng serve --o
```

The application will open automatically at `http://localhost:4200`

### Building for Production

```bash
ng build --configuration production
```

## Core Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Protected routes with guards

### Dashboard Features
- Real-time statistics visualization
- Interactive charts and graphs
- Data export capabilities

### User Management
- CRUD operations for user accounts
- User role management
- Profile management

### Attractions Management
- Complete attraction lifecycle management
- Media upload and management
- Location tracking

## Technologies Used

- **Frontend Framework:** Angular 17
- **UI Components:** Angular Material
- **Styling:** Tailwind CSS
- **Charts:** Chart.js
- **State Management:** RxJS
- **Code Quality:** ESLint, Prettier
- **Version Control:** Git

## Future Improvements

1. **Testing Enhancement**
   - Implement comprehensive unit testing
   - Add e2e testing coverage

2. **Component Optimization**
   - Create reusable table component with configurable features
   - Standardize table interfaces across the application

3. **UI Consistency**
   - Unify hover effects and animations
   - Create shared animation constants

## Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Documentation](https://material.angular.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/)

## Contact

- Ahmed Osama Bedawy - [@linkedin](https://www.linkedin.com/in/ahmeddoosama/)
- Project Link: [https://github.com/ahmeddoosama/user-and-attractions-management-dashboard](https://github.com/ahmeddoosama/user-and-attractions-management-dashboard)
