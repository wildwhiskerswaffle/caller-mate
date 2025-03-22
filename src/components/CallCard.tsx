
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Info } from 'lucide-react';

export type CallType = 'incoming' | 'outgoing' | 'missed' | 'unknown';

export interface CallData {
  id: string;
  name?: string;
  number: string;
  timestamp: Date;
  type: CallType;
  duration?: number; // in seconds
  location?: string;
}

interface CallCardProps {
  call: CallData;
}

const CallCard: React.FC<CallCardProps> = ({ call }) => {
  const navigate = useNavigate();
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes === 0) {
      return `${remainingSeconds}s`;
    }
    
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  const getCallIcon = () => {
    switch (call.type) {
      case 'incoming':
        return <PhoneIncoming className="w-5 h-5 text-caller-green" />;
      case 'outgoing':
        return <PhoneOutgoing className="w-5 h-5 text-caller-blue" />;
      case 'missed':
        return <PhoneMissed className="w-5 h-5 text-caller-red" />;
      default:
        return <Phone className="w-5 h-5 text-caller-gray-500" />;
    }
  };

  return (
    <div 
      className="flex items-center justify-between px-4 py-3 rounded-xl card-hover animate-scale-up"
      onClick={() => navigate(`/call/${call.id}`)}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {getCallIcon()}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-medium">
              {call.name || call.number}
            </h3>
            {!call.name && (
              <span className="text-caller-blue text-xs flex items-center gap-0.5">
                <Info className="w-3 h-3" />
                Identify
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {call.location && <span>{call.location}</span>}
            {call.duration !== undefined && call.type !== 'missed' && (
              <span>{formatDuration(call.duration)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        {formatTime(call.timestamp)}
      </div>
    </div>
  );
};

export default CallCard;
