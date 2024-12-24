import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("normal");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users/list"); // Replace with your actual API URL
        setStudents(response.data.students || []);
        console.log(students)
      } catch (err) {
        setError("Failed to fetch student data. Please try again.");
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };
    fetchStudents();
  }, []);

  // Sort students
  let sortedStudents = [...students];
  if (sortOrder === "desc") {
    sortedStudents.sort((a, b) => b.Experience - a.Experience);
  } else {
    sortedStudents.sort((a, b) => a.id - b.id);
  }

  // Filter students by search query
  const filteredStudents = sortedStudents.filter((student) =>
    (student.Name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.Skill || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render loading, error, or main content
  if (loading) {
    return <div className="text-center mt-10 text-blue-600">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Student List</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Name or Skill"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sort Button */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "normal" : "desc")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
        >
          Sort by Experience ({sortOrder === "desc" ? "Descending" : "Normal (by ID)"})
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Skill</th>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Experience (Years)</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{student.id}</td>
                  <td className="p-3">{student.Name}</td>
                  <td className="p-3">{student.Skill}</td>
                  <td className="p-3">{student.Branch}</td>
                  <td className="p-3">{student.Experience}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
