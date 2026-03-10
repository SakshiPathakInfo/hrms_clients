import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const BASE_URL = import.meta.env.BACKEND_URL;

interface Employee {
  _id: string;
  employeeId: string;
  fullName: string;
  department: string;
}

interface AttendanceRecord {
  _id: string;
  employeeId: string;
  date: string;
  status: 'Present' | 'Absent';
}

export default function Attendance() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<Record<string, 'Present' | 'Absent'>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch employees
        const empRes = await fetch('${BASE_URL}/api/employees');
        if (!empRes.ok) throw new Error('Failed to fetch employees');
        const empData = await empRes.json();
        setEmployees(empData);

        // Fetch attendance for selected date
        const attRes = await fetch(`${BASE_URL}/api/attendance?date=${date}`);
        if (!attRes.ok) throw new Error('Failed to fetch attendance');
        const attData: AttendanceRecord[] = await attRes.json();
        
        // Map attendance to employeeId
        const attMap: Record<string, 'Present' | 'Absent'> = {};
        attData.forEach(record => {
          attMap[record.employeeId] = record.status;
        });
        setAttendance(attMap);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  const handleMarkAttendance = async (employeeId: string, status: 'Present' | 'Absent') => {
    try {
      setSaving(employeeId);
      const res = await fetch('${BASE_URL}/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, date, status })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to mark attendance');
      }

      setAttendance(prev => ({ ...prev, [employeeId]: status }));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Attendance Management</h2>
        
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <Calendar className="w-5 h-5 text-gray-500" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-none focus:ring-0 text-sm font-medium text-gray-700 bg-transparent"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {employees.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No employees found</h3>
          <p className="text-gray-500">Add employees first to mark attendance.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.map((emp) => {
                  const status = attendance[emp.employeeId];
                  const isSaving = saving === emp.employeeId;

                  return (
                    <tr key={emp._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                            {emp.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{emp.fullName}</div>
                            <div className="text-xs text-gray-500">{emp.employeeId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{emp.department}</span>
                      </td>
                      <td className="px-6 py-4">
                        {status === 'Present' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                            <CheckCircle className="w-3.5 h-3.5" /> Present
                          </span>
                        )}
                        {status === 'Absent' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                            <XCircle className="w-3.5 h-3.5" /> Absent
                          </span>
                        )}
                        {!status && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            <Clock className="w-3.5 h-3.5" /> Not Marked
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            disabled={isSaving}
                            onClick={() => handleMarkAttendance(emp.employeeId, 'Present')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                              status === 'Present'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            } disabled:opacity-50`}
                          >
                            Present
                          </button>
                          <button
                            disabled={isSaving}
                            onClick={() => handleMarkAttendance(emp.employeeId, 'Absent')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                              status === 'Absent'
                                ? 'bg-red-600 text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            } disabled:opacity-50`}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
