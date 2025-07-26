import React, { useState } from 'react';
import { MapPin, Plus, AlertTriangle } from 'lucide-react';
import TrafficMap from '@/components/TrafficMap';
import ReportTrafficForm from '@/components/ReportTrafficForm';
import AdminDashboard from '@/components/AdminDashboard';
import ProfileView from '@/components/ProfileView';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [currentView, setCurrentView] = useState('map');
  const [showReportForm, setShowReportForm] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'map':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">Traffic Alert System</h1>
              </div>
              <p className="text-muted-foreground">Real-time traffic monitoring for Mogadishu</p>
            </div>

            {/* Quick Action Button */}
            <Card className="bg-gradient-to-r from-traffic-warning to-traffic-heavy text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Report Traffic Jam</h3>
                    <p className="text-sm opacity-90">Help other drivers avoid traffic</p>
                  </div>
                  <Button 
                    onClick={() => setShowReportForm(true)}
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Report Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Traffic Map */}
            <TrafficMap />

            {/* Recent Alerts */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-traffic-warning" />
                  <h3 className="font-semibold">Recent Traffic Alerts</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-traffic-heavy/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-traffic-heavy rounded-full"></div>
                      <span className="text-sm font-medium">Makka Al Mukarama Road</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-traffic-moderate/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-traffic-moderate rounded-full"></div>
                      <span className="text-sm font-medium">Via Roma</span>
                    </div>
                    <span className="text-xs text-muted-foreground">5 min ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'report':
        return <ReportTrafficForm onClose={() => setCurrentView('map')} />;
      case 'admin':
        return <AdminDashboard />;
      case 'profile':
        return <ProfileView />;
      default:
        return <TrafficMap />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar / Mobile Bottom Navigation */}
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
        
        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 md:pb-4 md:p-6">
          {renderContent()}
        </main>
      </div>

      {/* Report Form Modal for mobile */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <ReportTrafficForm onClose={() => setShowReportForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
