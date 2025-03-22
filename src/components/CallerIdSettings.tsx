
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { clearCallerCache } from '@/services/callerIdService';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Clock, 
  Trash2, 
  RefreshCw,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

interface CallerIdSettingsProps {
  enabled: boolean;
  onToggleEnabled: (enabled: boolean) => void;
  timeout: number;
  onTimeoutChange: (timeout: number) => void;
  lookupContacts: boolean;
  onToggleLookupContacts: (enabled: boolean) => void;
}

const CallerIdSettings: React.FC<CallerIdSettingsProps> = ({
  enabled,
  onToggleEnabled,
  timeout,
  onTimeoutChange,
  lookupContacts,
  onToggleLookupContacts
}) => {
  const { toast } = useToast();

  const handleClearCache = () => {
    clearCallerCache();
    toast({
      title: "Cache Cleared",
      description: "All cached caller information has been cleared",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-caller-blue mr-2" />
            <h3 className="font-medium">Caller ID Lookup</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Identify unknown callers in real-time
          </p>
        </div>
        <Switch 
          checked={enabled} 
          onCheckedChange={onToggleEnabled} 
        />
      </div>

      {enabled && (
        <>
          <div className="space-y-3">
            <div className="flex items-center">
              <UserCheck className="w-5 h-5 text-caller-green mr-2" />
              <h4 className="text-sm font-medium">Lookup Known Contacts</h4>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Also lookup numbers already in your contacts
              </p>
              <Switch 
                checked={lookupContacts} 
                onCheckedChange={onToggleLookupContacts} 
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-caller-gray-600 mr-2" />
              <h4 className="text-sm font-medium">Lookup Timeout: {timeout/1000}s</h4>
            </div>
            <Slider
              value={[timeout]}
              min={1000}
              max={10000}
              step={1000}
              onValueChange={(value) => onTimeoutChange(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              How long to wait for caller information before giving up
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-caller-red mr-2" />
              <h4 className="text-sm font-medium">Privacy Notice</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              When enabled, unknown phone numbers will be sent to our caller ID service 
              to retrieve information. We do not store your contacts or call history on our servers.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleClearCache}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cache
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Test Service
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CallerIdSettings;
