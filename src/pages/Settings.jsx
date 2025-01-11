import { Bell, Lock, User } from "lucide-react";
import { Card } from "@/components/ui/card";

const Settings = () => {
  const settingSections = [
    {
      title: "Profile Settings",
      icon: <User className="text-blue-600" />,
      options: [
        {
          label: "Edit Profile",
          description: "Update your personal information",
        },
        { label: "Profile Picture", description: "Change your profile photo" },
      ],
    },
    {
      title: "Notifications",
      icon: <Bell className="text-blue-600" />,
      options: [
        { label: "Email Notifications", description: "Manage email alerts" },
        {
          label: "Push Notifications",
          description: "Configure push notifications",
        },
      ],
    },
    {
      title: "Security",
      icon: <Lock className="text-blue-600" />,
      options: [
        { label: "Change Password", description: "Update your password" },
        { label: "Two-Factor Auth", description: "Enable 2FA security" },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {settingSections.map((section, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center gap-3 mb-6">
            {section.icon}
            <h2 className="text-xl font-semibold">{section.title}</h2>
          </div>
          <div className="space-y-4">
            {section.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{option.label}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  Configure
                </button>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Settings;