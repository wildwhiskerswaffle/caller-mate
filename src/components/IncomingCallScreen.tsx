
import React, { useEffect, useState } from 'react';
import { X, Phone, PhoneOff, User, MapPin, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export interface CallerInfo {
  name?: string;
  phoneNumber: string;
  location?: string;
  spamLikelihood?: number; // 0-100
  avatarUrl?: string;
  tags?: string[];
  cached?: boolean;
}

interface IncomingCallScreenProps {
  callerInfo: CallerInfo | null;
  isLoading: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onBlock: () => void;
}

const IncomingCallScreen: React.FC<IncomingCallScreenProps> = ({
  callerInfo,
  isLoading,
  onAccept,
  onDecline,
  onBlock
}) => {
  const { toast } = useToast();

  useEffect(() => {
    if (callerInfo?.cached) {
      toast({
        title: "Using cached information",
        description: "This caller information was retrieved from cache",
        duration: 3000,
      });
    }
  }, [callerInfo, toast]);

  const getSpamBadge = (spamLikelihood?: number) => {
    if (spamLikelihood === undefined) return null;
    
    if (spamLikelihood > 75) {
      return <Badge variant="destructive" className="px-3 py-1 text-xs font-medium">High Spam Risk</Badge>;
    } else if (spamLikelihood > 40) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 px-3 py-1 text-xs font-medium">Possible Spam</Badge>;
    } else {
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 px-3 py-1 text-xs font-medium">Safe Caller</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-[90%] max-w-md bg-card rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center"
      >
        <div className="w-24 h-24 rounded-full bg-caller-gray-200 flex items-center justify-center mb-4">
          {callerInfo?.avatarUrl ? (
            <img 
              src={callerInfo.avatarUrl} 
              alt={callerInfo.name || 'Unknown caller'} 
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-caller-gray-500" />
          )}
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-caller-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-medium">Identifying caller...</p>
            <p className="text-muted-foreground">{callerInfo?.phoneNumber}</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mt-2">
              {callerInfo?.name || 'Unknown Caller'}
            </h2>
            <p className="text-lg text-muted-foreground mb-2">{callerInfo?.phoneNumber}</p>
            
            {callerInfo?.location && (
              <div className="flex items-center mt-1 mb-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{callerInfo.location}</span>
              </div>
            )}
            
            {getSpamBadge(callerInfo?.spamLikelihood)}
            
            {callerInfo?.tags && callerInfo.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3 mb-2 justify-center">
                {callerInfo.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </>
        )}
        
        <div className="flex justify-around w-full mt-8">
          <Button 
            variant="outline" 
            className="rounded-full w-14 h-14 p-0 border-caller-red hover:bg-caller-red/10" 
            onClick={onDecline}
          >
            <PhoneOff className="h-6 w-6 text-caller-red" />
          </Button>
          
          <Button 
            variant="outline" 
            className="rounded-full w-14 h-14 p-0 border-caller-green hover:bg-caller-green/10" 
            onClick={onAccept}
          >
            <Phone className="h-6 w-6 text-caller-green" />
          </Button>
          
          <Button 
            variant="outline" 
            className="rounded-full w-14 h-14 p-0 border-caller-gray-400 hover:bg-caller-gray-100" 
            onClick={onBlock}
          >
            <Shield className="h-6 w-6 text-caller-gray-600" />
          </Button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            {isLoading ? "Looking up caller information..." : callerInfo?.cached ? "Information from cache" : "Information provided by Caller ID service"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default IncomingCallScreen;
