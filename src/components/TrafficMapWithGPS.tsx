import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, AlertTriangle, Plus, Crosshair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface TrafficMapWithGPSProps {
  onReportTraffic: () => void;
}

const TrafficMapWithGPS = ({ onReportTraffic }: TrafficMapWithGPSProps) => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const { toast } = useToast();

  // Mock traffic data for Mogadishu
  const trafficAlerts = [
    { id: 1, location: "Makka Al Mukarama Road", lat: 2.0469, lng: 45.3182, severity: "heavy", time: "2 min ago", description: "Blocked by accident" },
    { id: 2, location: "Via Roma", lat: 2.0369, lng: 45.3282, severity: "moderate", time: "5 min ago", description: "Heavy traffic" },
    { id: 3, location: "Wardhigley District", lat: 2.0569, lng: 45.3082, severity: "heavy", time: "8 min ago", description: "Road construction" },
    { id: 4, location: "Bakara Market", lat: 2.0269, lng: 45.3382, severity: "free", time: "1 min ago", description: "Traffic cleared" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'heavy': return 'bg-traffic-heavy';
      case 'moderate': return 'bg-traffic-moderate';
      case 'free': return 'bg-traffic-free';
      default: return 'bg-traffic-warning';
    }
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationLoading(false);
          toast({
            title: "Location Found",
            description: "Your current location has been updated",
          });
        },
        (error) => {
          setLocationLoading(false);
          // Mock location for Mogadishu if GPS fails
          setUserLocation({ lat: 2.0469, lng: 45.3182 });
          toast({
            title: "Location Access",
            description: "Using default Mogadishu location",
            variant: "destructive",
          });
        }
      );
    } else {
      setLocationLoading(false);
      setUserLocation({ lat: 2.0469, lng: 45.3182 });
      toast({
        title: "GPS Not Available",
        description: "Using default Mogadishu location",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Map placeholder with Mogadishu-like grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Map title */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="p-3 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Mogadishu Live Traffic</span>
          </div>
        </Card>
      </div>

      {/* GPS Location Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          size="sm"
          variant="secondary"
          onClick={getCurrentLocation}
          disabled={locationLoading}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Crosshair className={`h-4 w-4 ${locationLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Traffic status legend */}
      <div className="absolute top-16 right-4 z-10">
        <Card className="p-3 bg-white/90 backdrop-blur-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-traffic-free"></div>
              <span>Free Flow</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-traffic-moderate"></div>
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-traffic-heavy"></div>
              <span>Heavy Jam</span>
            </div>
          </div>
        </Card>
      </div>

      {/* User location marker */}
      {userLocation && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg z-20"></div>
            <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary/30 rounded-full animate-ping"></div>
            <Badge className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs">
              You
            </Badge>
          </div>
        </div>
      )}

      {/* Traffic alert markers */}
      {trafficAlerts.map((alert, index) => {
        const positions = [
          { top: '25%', left: '30%' },
          { top: '60%', left: '70%' },
          { top: '80%', left: '40%' },
          { top: '40%', left: '80%' }
        ];
        const position = positions[index] || positions[0];
        
        return (
          <div key={alert.id} className="absolute z-10" style={position}>
            <div className="relative group">
              <div className={`w-4 h-4 ${getSeverityColor(alert.severity)} rounded-full border-2 border-white shadow-lg ${alert.severity === 'heavy' ? 'animate-pulse' : ''}`}></div>
              {alert.severity === 'heavy' && (
                <div className={`absolute -top-1 -left-1 w-6 h-6 ${getSeverityColor(alert.severity)}/30 rounded-full animate-ping`}></div>
              )}
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white p-2 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="font-medium">{alert.location}</div>
                <div className="text-xs text-gray-300">{alert.description}</div>
                <div className="text-xs text-gray-400">{alert.time}</div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating Action Button - Report Traffic */}
      <div className="absolute bottom-6 right-6 z-20">
        <Button
          onClick={onReportTraffic}
          size="lg"
          className="h-16 w-16 rounded-full bg-gradient-to-r from-traffic-warning to-traffic-heavy text-white shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse"
        >
          <div className="flex flex-col items-center">
            <AlertTriangle className="h-6 w-6" />
            <span className="text-xs font-medium">Report</span>
          </div>
        </Button>
      </div>

      {/* Active alerts panel */}
      <div className="absolute bottom-4 left-4 z-10 max-w-xs">
        <Card className="p-3 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-traffic-warning" />
            <span className="font-semibold text-sm">Live Alerts</span>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {trafficAlerts.filter(alert => alert.severity !== 'free').slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center gap-2 text-xs p-1">
                <div className={`w-2 h-2 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                <div className="flex-1">
                  <div className="font-medium truncate">{alert.location}</div>
                  <div className="text-muted-foreground">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TrafficMapWithGPS;