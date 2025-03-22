
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import IncomingCallScreen from '@/components/IncomingCallScreen';
import useIncomingCall from '@/hooks/useIncomingCall';
import { PhoneIncoming } from 'lucide-react';

const IncomingCallDemo: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('+1 (555) 123-4567');
  const { 
    callerInfo, 
    isLoading, 
    incomingCall, 
    handleIncomingCall, 
    acceptCall, 
    declineCall, 
    blockCaller 
  } = useIncomingCall();

  const simulateIncomingCall = () => {
    if (phoneNumber.trim()) {
      handleIncomingCall(phoneNumber);
    }
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
          onAccept={acceptCall}
          onDecline={declineCall}
          onBlock={blockCaller}
        />
      )}
    </div>
  );
};

export default IncomingCallDemo;
