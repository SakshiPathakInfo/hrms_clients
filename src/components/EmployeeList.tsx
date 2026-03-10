import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Mail, Briefcase, User, Users } from 'lucide-react';

const BASE_URL = "https://hrms-backend-3-tlnb.onrender.com/api/employees";

interface Employee {
  _id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    department: ''
  });

  // State for real-time field errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error('Failed to fetch employees');
      const data = await res.json();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // --- Real-time Validation Logic ---
  const validateField = (name: string, value: string) => {
    let errorMsg = "";

    switch (name) {
      case 'employeeId':
        if (!value.trim()) errorMsg = "Employee ID is required";
        else if (value.length < 3) errorMsg = "ID must be at least 3 characters";
        break;
      case 'fullName':
        const nameRegex = /^[a-zA-Z\s]*$/;
        if (!value.trim()) errorMsg = "Full Name is required";
        else if (!nameRegex.test(value)) errorMsg = "Only alphabets are allowed";
        else if (value.trim().length < 2) errorMsg = "Name is too short";
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) errorMsg = "Email is required";
        else if (!emailRegex.test(value)) errorMsg = "Invalid email format";
        break;
      case 'department':
        if (!value.trim()) errorMsg = "Department is required";
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Prevent starting space
    if (value.startsWith(' ')) return;

    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final check before submission
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key as keyof typeof formData]);
    });

    if (Object.values(errors).some(err => err !== "") || Object.values(formData).some(val => val === "")) {
      return; 
    }

    setSubmitting(true);
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add employee');

      setEmployees([data, ...employees]);
      setShowAddForm(false);
      setFormData({ employeeId: '', fullName: '', email: '', department: '' });
      setErrors({});
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setErrors({});
          }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {showAddForm ? 'Close' : 'Add Employee'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
          <form onSubmit={handleAddEmployee} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Input Field Helper */}
            {[
              { label: 'Employee ID', name: 'employeeId', type: 'text', placeholder: 'EMP001' },
              { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'John Doe' },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@example.com' },
              { label: 'Department', name: 'department', type: 'text', placeholder: 'Engineering' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}*</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md outline-none transition-all ${
                    errors[field.name] ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-indigo-500'
                  }`}
                  placeholder={field.placeholder}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                disabled={submitting || Object.values(errors).some(e => e !== "")}
                className="bg-indigo-600 text-white px-8 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Processing...' : 'Save Employee'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Section */}
      {loading ? (
        <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
      ) : employees.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <Users className="mx-auto w-10 h-10 text-gray-400 mb-3" />
          <p className="text-gray-500">No records found. Add your first employee!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Employee</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        {emp.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{emp.fullName}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <User className="w-3 h-3" /> {emp.employeeId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" />{emp.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 flex items-center w-fit gap-1">
                        <Briefcase className="w-3 h-3" /> {emp.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(emp._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
