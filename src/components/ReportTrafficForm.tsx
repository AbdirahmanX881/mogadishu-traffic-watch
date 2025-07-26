import React, { useState } from 'react';
import { AlertTriangle, MapPin, Clock, Send, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const ReportTrafficForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    location: '',
    severity: '',
    description: '',
    duration: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would send to backend
    toast({
      title: "Traffic Report Submitted",
      description: `Alert for ${formData.location} has been reported successfully.`,
    });
    onClose();
  };

  const handleUseGPS = () => {
    // Mock GPS functionality
    setFormData(prev => ({
      ...prev,
      location: "Current Location (Via GPS)"
    }));
    toast({
      title: "Location Detected",
      description: "GPS location has been captured",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center bg-gradient-to-r from-traffic-warning to-traffic-heavy text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Report Traffic Jam
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Location Input */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter road name or area"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="flex-1"
                required
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleUseGPS}
                className="shrink-0"
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Severity Level */}
          <div className="space-y-2">
            <Label htmlFor="severity">Traffic Severity</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select traffic level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="heavy">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-traffic-heavy"></div>
                    Heavy Traffic - Complete Jam
                  </div>
                </SelectItem>
                <SelectItem value="moderate">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-traffic-moderate"></div>
                    Moderate Traffic - Slow Moving
                  </div>
                </SelectItem>
                <SelectItem value="accident">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    Accident - Road Blocked
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Expected Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Expected Duration</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="How long will this last?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15min">15 minutes</SelectItem>
                <SelectItem value="30min">30 minutes</SelectItem>
                <SelectItem value="1hour">1 hour</SelectItem>
                <SelectItem value="2hours">2+ hours</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Additional Details (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe the cause, alternate routes, or other helpful info..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-traffic-warning to-traffic-heavy hover:from-traffic-heavy hover:to-traffic-warning"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Report
            </Button>
          </div>
        </form>

        {/* Quick Tips */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-primary">Quick Tips:</p>
              <ul className="text-muted-foreground mt-1 space-y-1">
                <li>• Use GPS for accurate location</li>
                <li>• Report only current conditions</li>
                <li>• Include helpful details for other drivers</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportTrafficForm;