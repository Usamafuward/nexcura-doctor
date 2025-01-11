import { Card } from "@/components/ui/card";
import { Calendar, Clock, User, Video } from "lucide-react";

const Appointments = () => {
  const upcomingAppointments = [
    {
      patientName: "John Smith",
      date: "12 Jan 2025",
      time: "10:00 AM",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      patientName: "Sarah Johnson",
      date: "12 Jan 2025",
      time: "11:30 AM",
      type: "In-Person",
      status: "Pending",
    },
    // Add more appointments as needed
  ];

  return (
    <div className="p-6 space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Upcoming Appointments</h1>
        <div className="grid gap-4">
          {upcomingAppointments.map((appointment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <User className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{appointment.patientName}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{appointment.date}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {appointment.type === "Video Call" ? (
                    <Video className="text-green-600" />
                  ) : (
                    <User className="text-blue-600" />
                  )}
                  <span>{appointment.type}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Appointments;
