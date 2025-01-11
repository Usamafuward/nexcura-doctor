// import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";

const Patients = () => {
  const patients = [
    {
      id: "P001",
      name: "Alice Brown",
      age: 45,
      gender: "Female",
      contact: "+1 234-567-8901",
      lastVisit: "05 Jan 2025",
      status: "Active",
    },
    {
      id: "P002",
      name: "Bob Wilson",
      age: 32,
      gender: "Male",
      contact: "+1 234-567-8902",
      lastVisit: "03 Jan 2025",
      status: "Inactive",
    },
    // Add more patients as needed
  ];

  return (
    <div className="p-6 space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Patient Records</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Input placeholder="Search patients..." className="pl-10 w-64" />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Age</th>
                <th className="p-4 text-left">Gender</th>
                <th className="p-4 text-left">Contact</th>
                <th className="p-4 text-left">Last Visit</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t">
                  <td className="p-4">{patient.id}</td>
                  <td className="p-4">{patient.name}</td>
                  <td className="p-4">{patient.age}</td>
                  <td className="p-4">{patient.gender}</td>
                  <td className="p-4">{patient.contact}</td>
                  <td className="p-4">{patient.lastVisit}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        patient.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Patients;