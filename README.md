# HRMS Lite - Client

## Project Overview

HRMS Lite is a lightweight Human Resource Management System frontend application built with modern web technologies. It provides an intuitive interface for managing employee records and tracking daily attendance. The application features employee management with department filtering, real-time attendance marking, and a responsive design suitable for desktop and mobile devices.

### Key Features
- **Employee Management**: Add, view, delete, and filter employees by department
- **Attendance Tracking**: Mark daily attendance (Present/Absent) with date selection
- **Responsive UI**: Mobile-friendly interface using Tailwind CSS
- **Real-time Updates**: Instant UI feedback for all operations
- **Frontend Filtering**: Client-side department filtering for better performance

## Tech Stack Used

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite (for fast development and optimized builds)
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **Icons**: Lucide React (modern icon library)
- **Date Handling**: date-fns (lightweight date utility library)
- **HTTP Client**: Fetch API (built-in browser API for API calls)
- **Backend**: RESTful API hosted on Render

## Steps to Run the Project Locally

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Internet connection (for API calls to backend)

### Installation Steps

1. **Navigate to the client directory**:
   ```bash
   cd hrms-lite/client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit:
   ```
   http://localhost:5173
   ```

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run TypeScript type checking

## Assumptions and Limitations

### Assumptions
- Backend API is running and accessible at `https://hrms-backend-3-tlnb.onrender.com/api/`
- Internet connection is available for all API operations
- Modern browsers with ES6+ support are used
- User has necessary permissions to perform CRUD operations

### Limitations
- **No Offline Support**: Requires internet connection for all operations
- **No Authentication**: No user login/authentication system implemented
- **Basic Validation**: Form validation is minimal (relies on HTML5 validation)
- **No Data Persistence**: All data is stored on the backend; no local storage
- **Single Date Attendance**: Can only mark attendance for one date at a time
- **No Bulk Operations**: Cannot perform bulk attendance marking or employee operations
- **Fixed Backend URL**: Backend URL is hardcoded in the application
- **No Error Recovery**: Limited error handling and retry mechanisms
- **No Caching**: No client-side caching of employee or attendance data

## Usage Guide

### Managing Employees
1. Navigate to the "Employees" section
2. Click "Add Employee" to create new records
3. Use the department dropdown to filter employees
4. Delete employees using the delete button

### Tracking Attendance
1. Go to the "Attendance" section
2. Select a date using the date picker
3. Click "Present" or "Absent" buttons for each employee
4. View status indicators (green for present, red for absent)

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Attendance.tsx      # Attendance management
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── EmployeeList.tsx    # Employee CRUD operations
│   │   └── Layout.tsx          # App layout
│   ├── App.tsx                 # Root component
│   ├── index.css               # Global styles
│   └── main.tsx                # App entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # This file
```

## API Endpoints

The application communicates with a REST API hosted on Render:

- `GET /api/employees` - Retrieve all employees
- `POST /api/employees` - Create new employee
- `DELETE /api/employees/:id` - Delete employee by ID
- `GET /api/attendance?date=YYYY-MM-DD` - Get attendance for specific date
- `POST /api/attendance` - Mark attendance (employeeId, date, status)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


