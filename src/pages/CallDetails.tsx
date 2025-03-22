
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import { CallData } from '../components/CallCard';
import { Phone, Shield, Flag, MessageSquare, Star, Share2, Clock, MapPin, AlertCircle } from 'lucide-react';

const CallDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [call, setCall] = useState<CallData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching call details
    setTimeout(() => {
      // This would normally be an API call
      if (id === '1') {
        setCall({
          id: '1',
          name: 'John Smith',
          number: '+1 (555) 123-4567',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          type: 'incoming',
          duration: 125,
          location: 'New York, NY'
        });
      } else {
        // Mock data for other calls
        setCall({
          id: id || '0',
          number: '+1 (555) 987-6543',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          type: 'unknown',
          location: 'Unknown Location'
        });
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <>
        <Header showBackButton />
        <main className="page-container">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-caller-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Loading call details...</p>
          </div>
        </main>
      </>
    );
  }

  if (!call) {
    return (
      <>
        <Header showBackButton />
        <main className="page-container">
          <div className="flex flex-col items-center justify-center h-full">
            <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium">Call not found</p>
            <p className="text-muted-foreground mt-2">The call details you're looking for don't exist</p>
          </div>
        </main>
      </>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Header showBackButton />
      <main className="page-container">
        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-caller-gray-200 flex items-center justify-center mb-4">
            <span className="text-2xl font-medium">
              {call.name ? call.name.charAt(0) : '#'}
            </span>
          </div>
          <h1 className="text-2xl font-medium">{call.name || 'Unknown Caller'}</h1>
          <p className="text-caller-gray-600">{call.number}</p>
          {call.location && (
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              <span>{call.location}</span>
            </div>
          )}
        </div>

        <div className="flex justify-around mb-8 animate-slide-up">
          <button className="icon-button flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-caller-green flex items-center justify-center text-white">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs">Call</span>
          </button>
          
          <button className="icon-button flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-caller-blue flex items-center justify-center text-white">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="text-xs">Message</span>
          </button>
          
          <button className="icon-button flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-caller-gray-200 flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
            <span className="text-xs">Favorite</span>
          </button>
          
          <button className="icon-button flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-caller-gray-200 flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-xs">Share</span>
          </button>
        </div>

        <div className="bg-card rounded-2xl p-4 mb-4 shadow-sm animate-scale-up">
          <h2 className="text-lg font-medium mb-4">Call Information</h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-muted-foreground mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p>{formatDate(call.timestamp)} at {formatTime(call.timestamp)}</p>
              </div>
            </div>
            
            {call.duration !== undefined && (
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-muted-foreground mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p>{Math.floor(call.duration / 60)}m {call.duration % 60}s</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-muted-foreground mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p>{call.location || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between animate-fade-in">
          <button className="flex items-center justify-center gap-2 w-[48%] py-3 rounded-xl bg-caller-gray-100 text-caller-gray-900">
            <Shield className="w-5 h-5" />
            <span>Block</span>
          </button>
          <button className="flex items-center justify-center gap-2 w-[48%] py-3 rounded-xl bg-caller-gray-100 text-caller-red">
            <Flag className="w-5 h-5" />
            <span>Report Spam</span>
          </button>
        </div>
      </main>
    </>
  );
};

export default CallDetails;
