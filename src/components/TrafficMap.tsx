import React from 'react';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const TrafficMap = () => {
  // Mock traffic data for static display
  const trafficAlerts = [
    { id: 1, location: "Makka Al Mukarama Road", severity: "heavy", time: "2 min ago" },
    { id: 2, location: "Via Roma", severity: "moderate", time: "5 min ago" },
    { id: 3, location: "Wardhigley District", severity: "heavy", time: "8 min ago" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'heavy': return 'bg-traffic-heavy';
      case 'moderate': return 'bg-traffic-moderate';
      case 'free': return 'bg-traffic-free';
      default: return 'bg-traffic-warning';
    }
  };

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Map placeholder with grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Map title */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="p-3 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Mogadishu Traffic Map</span>
          </div>
        </Card>
      </div>

      {/* Traffic status indicators */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="p-3 bg-white/90 backdrop-blur-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-traffic-free"></div>
              <span>Free Road</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-traffic-moderate"></div>
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-traffic-heavy"></div>
              <span>Heavy Traffic</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Mock road indicators */}
      <div className="absolute top-1/4 left-1/4 w-32 h-2 bg-traffic-free rounded-full"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-2 bg-traffic-heavy rounded-full"></div>
      <div className="absolute top-3/4 left-1/2 w-28 h-2 bg-traffic-moderate rounded-full"></div>
      
      {/* Traffic markers */}
      <div className="absolute top-1/2 left-1/3">
        <div className="relative">
          <div className="w-4 h-4 bg-traffic-heavy rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <div className="absolute -top-1 -left-1 w-6 h-6 bg-traffic-heavy/30 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm">
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Current alerts overlay */}
      <div className="absolute bottom-4 left-4 z-10 max-w-xs">
        <Card className="p-3 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-traffic-warning" />
            <span className="font-semibold text-sm">Active Alerts</span>
          </div>
          <div className="space-y-1">
            {trafficAlerts.slice(0, 2).map((alert) => (
              <div key={alert.id} className="flex items-center gap-2 text-xs">
                <div className={`w-2 h-2 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                <span className="flex-1 truncate">{alert.location}</span>
                <span className="text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TrafficMap;