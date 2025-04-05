'use client';

import { useEffect, useState } from 'react';
import { useSession } from "../context/SessionContext";

export default function MedicationReadPage() {
  const { user } = useSession();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMedication, setEditingMedication] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState({ field: 'name', direction: 'asc' });

  const filteredAndSortedMedications = medications
    .filter(medication => statusFilter === 'all' ? true : medication.status === statusFilter)
    .sort((a, b) => {
      if (sortBy.field === 'name') {
        return sortBy.direction === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy.field === 'startDate') {
        return sortBy.direction === 'asc'
          ? new Date(a.startDate) - new Date(b.startDate)
          : new Date(b.startDate) - new Date(a.startDate);
      }
      return 0;
    });

  const getStatusCount = (status) => medications.filter(med => med.status === status).length;

  const handleUpdateMedication = async (medicationId, updatedData) => {
    try {
      const response = await fetch('/api/medication/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user?.id,
          medicationId,
          ...updatedData
        }),
      });

      if (response.ok) {
        const updatedMedication = await response.json();
        setMedications(medications.map(med => 
          med.id === medicationId ? updatedMedication : med
        ));
        setEditingMedication(null);
      }
    } catch (error) {
      console.error('Error updating medication:', error);
    }
  };

  const handleDeleteMedication = async (medicationId) => {
    try {
      const response = await fetch('/api/medication/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user?.id,
          medicationId: medicationId 
        }),
      });

      if (response.ok) {
        // Remove the deleted medication from the state
        setMedications(medications.filter(med => med.id !== medicationId));
      }
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch('/api/medication/read', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user?.id }),
        });

        if (response.ok) {
          const data = await response.json();
          setMedications(data);
        }
      } catch (error) {
        console.error('Error fetching medications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchMedications();
    }
  }, [user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600">Loading medications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors cursor-pointer"
              >
                Home
              </button>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">My Medications</h1>
              <button
                onClick={() => window.location.href = '/medication'}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors cursor-pointer"
              >
                Add Medication
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">View and manage your current medications</p>
          </div>

          <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-sm font-medium text-gray-500">Total Medications</div>
              <div className="mt-1 text-2xl font-semibold text-gray-900">{medications.length}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-sm font-medium text-gray-500">Active</div>
              <div className="mt-1 text-2xl font-semibold text-green-600">{getStatusCount('active')}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-sm font-medium text-gray-500">Completed</div>
              <div className="mt-1 text-2xl font-semibold text-blue-600">{getStatusCount('completed')}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-sm font-medium text-gray-500">Paused</div>
              <div className="mt-1 text-2xl font-semibold text-gray-600">{getStatusCount('paused')}</div>
            </div>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row justify-end gap-4">
            <div className="w-full sm:w-48">
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Medications</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
              </select>
            </div>
            <div className="w-full sm:w-48">
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
                Sort by
              </label>
              <select
                id="sort-by"
                value={`${sortBy.field}-${sortBy.direction}`}
                onChange={(e) => {
                  const [field, direction] = e.target.value.split('-');
                  setSortBy({ field, direction });
                }}
                className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="startDate-asc">Start Date (Oldest)</option>
                <option value="startDate-desc">Start Date (Newest)</option>
              </select>
            </div>
          </div>

          {medications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No medications found. Add your first medication here.</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {filteredAndSortedMedications.map((medication) => (
                <div
                  key={medication.id}
                  className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{medication.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Dosage: {medication.dosage} • Frequency: {medication.frequency}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        medication.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : medication.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingMedication(medication)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit medication"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteMedication(medication.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete medication"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {editingMedication?.id === medication.id ? (
                    <div className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            value={editingMedication.name}
                            onChange={(e) => setEditingMedication({...editingMedication, name: e.target.value})}
                            className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                          <input
                            type="text"
                            value={editingMedication.dosage}
                            onChange={(e) => setEditingMedication({...editingMedication, dosage: e.target.value})}
                            className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                          <input
                            type="text"
                            value={editingMedication.frequency}
                            onChange={(e) => setEditingMedication({...editingMedication, frequency: e.target.value})}
                            className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select
                            value={editingMedication.status}
                            onChange={(e) => setEditingMedication({...editingMedication, status: e.target.value})}
                            className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="paused">Paused</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                          <input
                            type="date"
                            value={editingMedication.startDate.split('T')[0]}
                            onChange={(e) => setEditingMedication({...editingMedication, startDate: e.target.value})}
                            className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                          <textarea
                            value={editingMedication.notes || ''}
                            onChange={(e) => setEditingMedication({...editingMedication, notes: e.target.value})}
                            rows={4}
                            className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                        <button
                          onClick={() => setEditingMedication(null)}
                          className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateMedication(medication.id, editingMedication)}
                          className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Start Date:</span> {new Date(medication.startDate).toLocaleDateString()}
                      </p>
                      {medication.notes && (
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">Notes:</span> {medication.notes}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => window.location.href = '/medication'}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors cursor-pointer"
            >
              Add Medication
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
