import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Users, MapPin, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();

  // Mock data for admin dashboard
  const pendingReports = [
    { id: 1, location: "Makka Al Mukarama Road", severity: "heavy", reporter: "Driver#1234", time: "2 min ago", status: "pending" },
    { id: 2, location: "Via Roma", severity: "moderate", reporter: "Driver#5678", time: "5 min ago", status: "pending" },
    { id: 3, location: "Wardhigley District", severity: "heavy", reporter: "Driver#9012", time: "8 min ago", status: "pending" },
  ];

  const [reports, setReports] = useState(pendingReports);

  const handleVerifyReport = (id: number) => {
    setReports(prev => prev.filter(report => report.id !== id));
    toast({
      title: "Report Verified",
      description: "Traffic alert has been verified and published",
    });
  };

  const handleRejectReport = (id: number) => {
    setReports(prev => prev.filter(report => report.id !== id));
    toast({
      title: "Report Rejected",
      description: "False report has been removed",
      variant: "destructive",
    });
  };

  const stats = {
    totalReports: 156,
    activeAlerts: 12,
    verifiedToday: 45,
    activeUsers: 1240
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'heavy': return 'bg-traffic-heavy text-white';
      case 'moderate': return 'bg-traffic-moderate text-white';
      case 'accident': return 'bg-destructive text-white';
      default: return 'bg-traffic-warning text-white';
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Mogadishu Traffic Management System</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-traffic-warning" />
              <div>
                <p className="text-2xl font-bold">{stats.totalReports}</p>
                <p className="text-xs text-muted-foreground">Total Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-traffic-heavy" />
              <div>
                <p className="text-2xl font-bold">{stats.activeAlerts}</p>
                <p className="text-xs text-muted-foreground">Active Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-traffic-free" />
              <div>
                <p className="text-2xl font-bold">{stats.verifiedToday}</p>
                <p className="text-xs text-muted-foreground">Verified Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Pending Reports</TabsTrigger>
          <TabsTrigger value="alerts">Manage Alerts</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Reports Awaiting Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">{report.location}</span>
                          <Badge className={getSeverityColor(report.severity)}>
                            {report.severity}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Reporter: {report.reporter}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {report.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleVerifyReport(report.id)}
                          className="text-traffic-free border-traffic-free hover:bg-traffic-free hover:text-white"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectReport(report.id)}
                          className="text-traffic-heavy border-traffic-heavy hover:bg-traffic-heavy hover:text-white"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {reports.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-traffic-free" />
                    <p>All reports have been reviewed!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manually Add Traffic Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-20 bg-gradient-to-r from-traffic-warning to-traffic-heavy text-white">
                  <div className="text-center">
                    <AlertTriangle className="h-6 w-6 mx-auto mb-1" />
                    <p>Friday Prayer Traffic</p>
                  </div>
                </Button>
                <Button className="h-20 bg-gradient-to-r from-traffic-heavy to-destructive text-white">
                  <div className="text-center">
                    <XCircle className="h-6 w-6 mx-auto mb-1" />
                    <p>Road Construction</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity & Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Driver#1234</p>
                    <p className="text-sm text-muted-foreground">12 reports • 95% accuracy</p>
                  </div>
                  <Badge variant="secondary">Trusted Reporter</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Driver#5678</p>
                    <p className="text-sm text-muted-foreground">8 reports • 87% accuracy</p>
                  </div>
                  <Badge variant="secondary">Active User</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Driver#9012</p>
                    <p className="text-sm text-muted-foreground">3 reports • 33% accuracy</p>
                  </div>
                  <Badge variant="destructive">Under Review</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;