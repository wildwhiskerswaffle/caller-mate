
import React from 'react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import { 
  Bell, 
  ShieldCheck, 
  Lock, 
  Palette, 
  Star, 
  HelpCircle, 
  ChevronRight 
} from 'lucide-react';

const Settings: React.FC = () => {
  const settingsGroups = [
    {
      title: 'General',
      items: [
        {
          icon: <Bell className="w-5 h-5 text-caller-blue" />,
          label: 'Notifications',
          description: 'Manage call alerts and badges',
          action: <ChevronRight className="w-5 h-5 text-caller-gray-400" />
        },
        {
          icon: <ShieldCheck className="w-5 h-5 text-caller-green" />,
          label: 'Call Blocking',
          description: 'Manage blocked numbers and filters',
          action: <ChevronRight className="w-5 h-5 text-caller-gray-400" />
        },
        {
          icon: <Palette className="w-5 h-5 text-caller-indigo" />,
          label: 'Appearance',
          description: 'Theme and display options',
          action: <ChevronRight className="w-5 h-5 text-caller-gray-400" />
        }
      ]
    },
    {
      title: 'Account',
      items: [
        {
          icon: <Lock className="w-5 h-5 text-caller-red" />,
          label: 'Privacy',
          description: 'Manage your privacy settings',
          action: <ChevronRight className="w-5 h-5 text-caller-gray-400" />
        },
        {
          icon: <Star className="w-5 h-5 text-caller-blue" />,
          label: 'Premium Features',
          description: 'Upgrade to unlock premium features',
          action: <ChevronRight className="w-5 h-5 text-caller-gray-400" />
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: <HelpCircle className="w-5 h-5 text-caller-blue" />,
          label: 'Help & Support',
          description: 'Get help or send feedback',
          action: <ChevronRight className="w-5 h-5 text-caller-gray-400" />
        }
      ]
    }
  ];

  return (
    <>
      <Header title="Settings" transparent />
      <main className="page-container">
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-caller-gray-200 flex items-center justify-center">
              <span className="text-xl font-medium">U</span>
            </div>
            <div>
              <h2 className="text-xl font-medium">User</h2>
              <p className="text-sm text-muted-foreground">Free Plan</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <div 
              key={group.title} 
              className="animate-slide-up" 
              style={{ animationDelay: `${groupIndex * 100}ms` }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
                {group.title}
              </h3>
              <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
                {group.items.map((item, i) => (
                  <div 
                    key={item.label}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b last:border-b-0 border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {item.action}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground animate-fade-in">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2023 Caller ID App</p>
        </div>
      </main>
      <BottomNav />
    </>
  );
};

export default Settings;
