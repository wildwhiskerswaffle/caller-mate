
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import IncomingCallScreen from '@/components/IncomingCallScreen';
import useIncomingCall from '@/hooks/useIncomingCall';
import { PhoneIncoming, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Create audio for ringtone
const ringtoneUrl = 'https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a';

interface CallHistoryItem {
  phoneNumber: string;
  timestamp: Date;
  duration?: number;
  action: 'accepted' | 'declined' | 'blocked';
  callerName?: string;
}

const IncomingCallDemo: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('+1 (555) 123-4567');
  const [ringDuration, setRingDuration] = useState<number>(0);
  const [callHistory, setCallHistory] = useState<CallHistoryItem[]>([]);
  const ringTimer = useRef<NodeJS.Timeout | null>(null);
  const ringtoneRef = useRef<HTMLAudioElement | null>(null);
  
  const { 
    callerInfo, 
    isLoading, 
    incomingCall, 
    handleIncomingCall, 
    acceptCall, 
    declineCall, 
    blockCaller 
  } = useIncomingCall();

  useEffect(() => {
    // Create audio element for ringtone
    ringtoneRef.current = new Audio(ringtoneUrl);
    ringtoneRef.current.loop = true;
    
    return () => {
      // Clean up
      if (ringtoneRef.current) {
        ringtoneRef.current.pause();
        ringtoneRef.current = null;
      }
      if (ringTimer.current) {
        clearInterval(ringTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    // Handle ringtone and timer when call status changes
    if (incomingCall) {
      // Start ringtone
      if (ringtoneRef.current) {
        ringtoneRef.current.play().catch(err => {
          console.log("Audio playback error:", err);
          toast({
            title: "Audio couldn't play automatically",
            description: "Browser policy requires user interaction first",
            variant: "destructive"
          });
        });
      }
      
      // Start timer for ring duration
      setRingDuration(0);
      ringTimer.current = setInterval(() => {
        setRingDuration(prev => prev + 1);
      }, 1000);
      
      // Auto-decline after 30 seconds if not answered
      setTimeout(() => {
        if (incomingCall) {
          handleDeclineCall();
          toast({
            title: "Call Missed",
            description: "The caller hung up after 30 seconds",
          });
        }
      }, 30000);
    } else {
      // Stop ringtone and timer when call ends
      if (ringtoneRef.current) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
      }
      if (ringTimer.current) {
        clearInterval(ringTimer.current);
        ringTimer.current = null;
      }
    }
  }, [incomingCall]);

  const simulateIncomingCall = () => {
    if (phoneNumber.trim()) {
      handleIncomingCall(phoneNumber);
    }
  };
  
  const handleAcceptCall = () => {
    const duration = ringDuration;
    acceptCall();
    
    // Add to call history
    setCallHistory(prev => [
      {
        phoneNumber: callerInfo?.phoneNumber || phoneNumber,
        timestamp: new Date(),
        duration,
        action: 'accepted',
        callerName: callerInfo?.name
      },
      ...prev
    ]);
  };
  
  const handleDeclineCall = () => {
    const duration = ringDuration;
    declineCall();
    
    // Add to call history
    setCallHistory(prev => [
      {
        phoneNumber: callerInfo?.phoneNumber || phoneNumber,
        timestamp: new Date(),
        duration,
        action: 'declined',
        callerName: callerInfo?.name
      },
      ...prev
    ]);
  };
  
  const handleBlockCaller = () => {
    const duration = ringDuration;
    blockCaller();
    
    // Add to call history
    setCallHistory(prev => [
      {
        phoneNumber: callerInfo?.phoneNumber || phoneNumber,
        timestamp: new Date(),
        duration,
        action: 'blocked',
        callerName: callerInfo?.name
      },
      ...prev
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-4 bg-card rounded-xl shadow-sm">
      <h3 className="text-lg font-medium mb-4">Incoming Call Simulator</h3>
      
      <div className="flex gap-2 mb-4">
        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          className="flex-1"
        />
        <Button 
          onClick={simulateIncomingCall}
          className="bg-caller-green hover:bg-caller-green/90 text-white"
          disabled={incomingCall}
        >
          <PhoneIncoming className="w-4 h-4 mr-2" />
          Simulate Call
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>Test the caller ID lookup feature by simulating an incoming call.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Numbers ending with "1234" will be recognized as contacts</li>
          <li>Numbers ending with 0, 3, 6, 9 will show as safe</li>
          <li>Numbers ending with 1, 4, 7 will show as possible spam</li>
          <li>Numbers ending with 2, 5, 8 will show as likely spam</li>
        </ul>
      </div>
      
      {incomingCall && (
        <IncomingCallScreen
          callerInfo={callerInfo}
          isLoading={isLoading}
          onAccept={handleAcceptCall}
          onDecline={handleDeclineCall}
          onBlock={handleBlockCaller}
          ringDuration={ringDuration}
        />
      )}
      
      {/* Call History */}
      {callHistory.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-sm mb-2">Recent Simulated Calls</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {callHistory.map((call, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-muted/50 text-sm">
                <div>
                  <div className="font-medium">{call.callerName || call.phoneNumber}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Ring time: {call.duration}s</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">{formatTime(call.timestamp)}</span>
                  <span className={`text-xs ${
                    call.action === 'accepted' ? 'text-caller-green' : 
                    call.action === 'declined' ? 'text-caller-red' : 
                    'text-caller-gray-600'
                  }`}>
                    {call.action === 'accepted' ? 'Accepted' : 
                     call.action === 'declined' ? 'Declined' : 'Blocked'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomingCallDemo;
