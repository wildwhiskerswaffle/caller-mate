
import { useState, useCallback, useEffect } from 'react';
import { CallerInfo } from '@/components/IncomingCallScreen';
import { fetchCallerInfo, isInContacts, getContactInfo } from '@/services/callerIdService';
import { useToast } from '@/hooks/use-toast';

interface UseIncomingCallResult {
  callerInfo: CallerInfo | null;
  isLoading: boolean;
  incomingCall: boolean;
  handleIncomingCall: (phoneNumber: string) => Promise<void>;
  acceptCall: () => void;
  declineCall: () => void;
  blockCaller: () => void;
}

const useIncomingCall = (): UseIncomingCallResult => {
  const [callerInfo, setCallerInfo] = useState<CallerInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [incomingCall, setIncomingCall] = useState<boolean>(false);
  const { toast } = useToast();

  const handleIncomingCall = useCallback(async (phoneNumber: string) => {
    setIncomingCall(true);
    setIsLoading(true);
    
    // Initial basic info
    setCallerInfo({
      phoneNumber
    });

    // Check if the number is in contacts
    if (isInContacts(phoneNumber)) {
      const contactInfo = getContactInfo(phoneNumber);
      setCallerInfo(contactInfo);
      setIsLoading(false);
      return;
    }

    try {
      const info = await fetchCallerInfo(phoneNumber);
      setCallerInfo(info);
      
      // Show toast if high spam likelihood
      if (info.spamLikelihood && info.spamLikelihood > 75) {
        toast({
          variant: "destructive",
          title: "Warning: Potential Spam Call",
          description: "This number has been reported as spam",
        });
      }
    } catch (error) {
      console.error("Failed to fetch caller info:", error);
      toast({
        variant: "destructive",
        title: "Caller ID Lookup Failed",
        description: "Could not retrieve information for this number",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const acceptCall = useCallback(() => {
    setIncomingCall(false);
    toast({
      title: "Call Accepted",
      description: `Connected to ${callerInfo?.name || callerInfo?.phoneNumber || 'Unknown'}`,
    });
  }, [callerInfo, toast]);

  const declineCall = useCallback(() => {
    setIncomingCall(false);
    toast({
      title: "Call Declined",
      description: `Declined call from ${callerInfo?.name || callerInfo?.phoneNumber || 'Unknown'}`,
    });
  }, [callerInfo, toast]);

  const blockCaller = useCallback(() => {
    setIncomingCall(false);
    toast({
      title: "Caller Blocked",
      description: `${callerInfo?.name || callerInfo?.phoneNumber || 'Unknown'} has been blocked`,
    });
    // In a real app, you would update a block list here
  }, [callerInfo, toast]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      setIncomingCall(false);
      setCallerInfo(null);
      setIsLoading(false);
    };
  }, []);

  return {
    callerInfo,
    isLoading,
    incomingCall,
    handleIncomingCall,
    acceptCall,
    declineCall,
    blockCaller
  };
};

export default useIncomingCall;
