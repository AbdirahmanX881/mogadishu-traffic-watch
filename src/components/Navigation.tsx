import React from 'react';
import { MapPin, Plus, Shield, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'report', label: 'Report', icon: Plus },
    { id: 'admin', label: 'Admin', icon: Shield },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white border-t border-border fixed bottom-0 left-0 right-0 z-50 md:relative md:border-t-0 md:border-r md:w-64 md:h-screen md:flex-col">
      <div className="flex md:flex-col p-2 md:p-4">
        {/* Mobile Header - Hidden on desktop */}
        <div className="hidden md:block mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Traffic Alert</h1>
              <p className="text-xs text-muted-foreground">Mogadishu</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex md:flex-col flex-1 justify-around md:justify-start md:space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => onViewChange(item.id)}
                className={`
                  flex-col md:flex-row md:justify-start gap-1 md:gap-3 h-auto md:h-10 p-2 md:px-3 md:py-2
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary to-primary-glow text-white shadow-lg' 
                    : 'hover:bg-accent'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs md:text-sm font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Desktop Menu Footer */}
        <div className="hidden md:block mt-auto pt-4">
          <div className="text-xs text-muted-foreground text-center">
            <p>Traffic Alert System</p>
            <p>v1.0.0</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;