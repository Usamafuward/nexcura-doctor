import { FileText, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

const Records = () => {
  const medicalRecords = [
    {
      id: "MR001",
      patientName: "David Chen",
      date: "08 Jan 2025",
      type: "Lab Report",
      doctor: "Dr. Ramesh",
      size: "2.4 MB",
    },
    {
      id: "MR002",
      patientName: "Emma Davis",
      date: "07 Jan 2025",
      type: "Prescription",
      doctor: "Dr. Ramesh",
      size: "1.1 MB",
    },
    // Add more records as needed
  ];

  return (
    <div className="p-6 space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Medical Records</h1>
        <div className="grid gap-4">
          {medicalRecords.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{record.patientName}</h3>
                  <p className="text-sm text-gray-600">
                    {record.type} - {record.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    Doctor: {record.doctor}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{record.size}</span>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Records;