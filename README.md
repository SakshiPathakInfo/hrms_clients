
# HRMS Lite - Client

A lightweight Human Resource Management System (HRMS) frontend built with React, TypeScript, and Tailwind CSS. This client application provides an intuitive interface for managing employees and tracking attendance.

## 🚀 Features

- **Employee Management**: Add, view, and delete employee records
- **Attendance Tracking**: Mark daily attendance for employees (Present/Absent)
- **Department Filtering**: Filter employees by department on the frontend
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time Updates**: Instant UI updates for attendance marking

## 🛠 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Backend API**: RESTful API hosted on Render

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository** (if applicable) or navigate to the client directory:
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

4. **Open your browser** and navigate to `http://localhost:5173`

## 📖 Usage

### Employee Management
- Navigate to the "Employees" section
- Click "Add Employee" to create new employee records
- Use the department filter to view employees by specific departments
- Delete employees using the trash icon

### Attendance Tracking
- Go to the "Attendance" section
- Select a date using the date picker
- Mark employees as Present or Absent
- View attendance status with color-coded indicators

## 🏗 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Attendance.tsx      # Attendance management component
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── EmployeeList.tsx    # Employee listing and management
│   │   └── Layout.tsx          # App layout wrapper
│   ├── App.tsx                 # Main app component
│   ├── index.css               # Global styles
│   └── main.tsx                # App entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔌 API Integration

The frontend communicates with a backend API hosted at:
`https://hrms-backend-3-tlnb.onrender.com/api/`

### Key Endpoints Used:
- `GET /api/employees` - Fetch all employees
- `POST /api/employees` - Add new employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/attendance?date=YYYY-MM-DD` - Fetch attendance for a date
- `POST /api/attendance` - Mark attendance

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript type checking

## 🎨 Styling

The application uses Tailwind CSS for styling with a clean, modern design:
- Indigo color scheme for primary elements
- Responsive grid layouts
- Hover effects and transitions
- Status indicators with color coding

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues, please check the backend repository or create an issue in the project repository.
