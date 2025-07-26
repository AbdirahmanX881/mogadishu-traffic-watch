import React from 'react';
import { User, MapPin, AlertTriangle, CheckCircle, Settings, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const ProfileView = () => {
  // Mock user data
  const userStats = {
    reportsSubmitted: 23,
    reportsVerified: 21,
    accuracyRate: 91,
    rank: "Trusted Reporter"
  };

  const recentReports = [
    { id: 1, location: "Makka Al Mukarama Road", status: "verified", time: "2 hours ago" },
    { id: 2, location: "Via Roma", status: "verified", time: "1 day ago" },
    { id: 3, location: "Wardhigley District", status: "pending", time: "2 days ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-traffic-free text-white';
      case 'rejected': return 'bg-traffic-heavy text-white';
      default: return 'bg-traffic-moderate text-white';
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-2xl">
      {/* User Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Driver #1234</h2>
              <p className="text-muted-foreground">Member since January 2024</p>
              <Badge className="mt-2 bg-gradient-to-r from-traffic-free to-green-600 text-white">
                {userStats.rank}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{userStats.reportsSubmitted}</p>
            <p className="text-xs text-muted-foreground">Reports Submitted</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-traffic-free" />
            <p className="text-2xl font-bold">{userStats.reportsVerified}</p>
            <p className="text-xs text-muted-foreground">Verified</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-6 h-6 mx-auto mb-2 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">%</span>
            </div>
            <p className="text-2xl font-bold">{userStats.accuracyRate}%</p>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="h-6 w-6 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold">Mogadishu</p>
            <p className="text-xs text-muted-foreground">Primary Area</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{report.location}</p>
                    <p className="text-xs text-muted-foreground">{report.time}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(report.status)}>
                  {report.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-primary" />
              <Label htmlFor="traffic-alerts">Traffic Alerts</Label>
            </div>
            <Switch id="traffic-alerts" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-4 w-4 text-traffic-warning" />
              <Label htmlFor="route-suggestions">Route Suggestions</Label>
            </div>
            <Switch id="route-suggestions" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-4 w-4 text-traffic-free" />
              <Label htmlFor="report-status">Report Status Updates</Label>
            </div>
            <Switch id="report-status" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Achievement Section */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 border rounded-lg bg-traffic-free/10">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-traffic-free" />
              <p className="font-semibold text-sm">First Report</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-primary/10">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold text-sm">10 Reports</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileView;