import { Calendar_show } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  ChevronDown,
  MoreVertical,
  Wallet,
  SquareUserRound,
  ArrowUpWideNarrow,
} from "lucide-react";
import doctor from "../assets/doctor.png";
import { useSidebar } from "../context/SidebarContext";  


const Dashboard = () => {
  const { isSidebarOpen } = useSidebar();

  const consultations = [
    {
      patientName: "kamalesh",
      age: 32,
      problem: "Diabetes",
      time: "03:00 - 05:00 Pm",
      status: "active",
    },
    {
      patientName: "kamalesh",
      age: 32,
      problem: "Diabetes",
      time: "03:00 - 05:00 Pm",
      status: "active",
    },
    {
      patientName: "kamalesh",
      age: 32,
      problem: "Diabetes",
      time: "03:00 - 05:00 Pm",
      status: "active",
    },
    {
      patientName: "kamalesh",
      age: 32,
      problem: "Diabetes",
      time: "03:00 - 05:00 Pm",
      status: "inactive",
    },
  ];

  const clinics = [
    { name: "Physical Clinic_01", date: "08 January 2025", time: "04:00 PM" },
    {
      name: "Video Conference Clinic",
      date: "08 January 2025",
      time: "04:00 PM",
    },
    { name: "Physical Clinic_02", date: "14 January 2025", time: "04:00 PM" },
  ];

  return (
    <div className="p-6 flex flex-col lg:flex-row w-full gap-6">
      <div className="flex-grow-[3]">
        <Card className="mb-4 sm:mb-6 bg-custom-gradient p-3 sm:p-4">
          <div className="flex flex-col lg:flex-row justify-between w-full">
            <div className="w-full xl:w-2/3 space-y-6 sm:space-y-11">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-4xl font-normal text-white text-left tracking-wide">
                  Welcome <span className="font-bold">Ramesh!</span>
                </h1>
                <p className="text-white/80 text-left text-sm sm:text-base">
                  Today, 08-01-2025
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 flex-wrap">
                <div className="bg-[#FFEF74] p-3 sm:p-4 rounded-lg flex-1 min-w-[160px] sm:min-w-[200px] space-y-4 sm:space-y-6">
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-left">
                      <div className="font-semibold text-sm sm:text-base">
                        Wallet Balance
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Monthly
                      </div>
                    </div>
                    <Wallet className="text-[#726400] w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-2xl sm:text-4xl font-bold text-left">
                    7,500.00
                  </div>
                </div>

                <div className="bg-[#DFFDDD] p-3 sm:p-4 rounded-lg flex-1 min-w-[160px] sm:min-w-[200px] space-y-4 sm:space-y-6">
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-left">
                      <div className="font-semibold text-sm sm:text-base">
                        Patient Count
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Monthly
                      </div>
                    </div>
                    <SquareUserRound className="text-[#008000] w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-4xl font-bold text-left">80</div>
                    <div className="flex items-center gap-1 bg-[#87FF80] p-2 rounded-sm justify-between space-x-3">
                      <span className="text-md font-semibold text-[#008000]">
                        51%
                      </span>
                      <ArrowUpWideNarrow className="text-[#008000] text-sm" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`xl:block absolute transition-all duration-300 hidden ${
                  isSidebarOpen
                    ? "right-[470px] top-[39px] object-cover"
                    : "right-[525px] top-[39px] object-cover"
                }`}
              >
                <img
                  src={doctor}
                  alt="Doctor"
                  className="w-[300px] h-[310px] object-cover"
                />
              </div>
            </div>
          </div>
        </Card>
        <div className="bg-white rounded-lg p-3 sm:p-4">
          <div className="flex justify-between items-center mb-4 sm:mb-6 flex-wrap gap-3">
            <h2 className="text-lg sm:text-xl font-semibold">
              Today Consultations
            </h2>
            <div className="flex gap-2">
              <button className="px-3 sm:px-4 py-1 bg-blue-500 text-white rounded-lg w-24 sm:w-32 text-sm sm:text-base">
                Online
              </button>
              <button className="px-3 sm:px-4 py-1 bg-gray-200 text-black rounded-lg w-24 sm:w-32 text-sm sm:text-base">
                Clinic
              </button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <table className="w-full min-w-[600px] sm:px-0">
              <thead>
                <tr className="text-gray-500 text-center">
                  <th className="py-3 px-2">Patient name</th>
                  <th className="py-3 px-2">Age</th>
                  <th className="py-3 px-2">Problem</th>
                  <th className="py-3 px-2">Time</th>
                  <th className="py-3 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((consultation, index) => (
                  <tr key={index} className="border-t text-center">
                    <td className="py-3 px-2">{consultation.patientName}</td>
                    <td className="py-3 px-2">{consultation.age}</td>
                    <td className="py-3 px-2">{consultation.problem}</td>
                    <td className="py-3 px-2">{consultation.time}</td>
                    <td className="py-3 px-2">
                      <button
                        className={`px-4 py-1 rounded-lg w-32 ${
                          consultation.status === "active"
                            ? "bg-[#87FF80]"
                            : "bg-gray-200"
                        }`}
                      >
                        Join
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg p-3 sm:p-6 flex-grow-[1]">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">Weekly Schedule</h2>
          <ChevronDown className="text-gray-400" />
        </div>

        <Calendar_show className="mb-4 sm:mb-6 w-full rounded-md border" />

        <div className="space-y-3 sm:space-y-4">
          {clinics.map((clinic, index) => (
            <div
              key={index}
              className={`p-3 sm:p-4 rounded-lg flex justify-between ${
                index % 2 === 0 ? "bg-[#FFD4E4]" : "bg-[#AFDEFF]"
              }`}
            >
              <div>
                <h3 className="font-medium text-left text-sm sm:text-base">
                  {clinic.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {clinic.date} | {clinic.time}
                </p>
              </div>
              <MoreVertical className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
