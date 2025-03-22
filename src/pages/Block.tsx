
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import { Shield, Plus, Trash, AlertTriangle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import IncomingCallDemo from '@/components/IncomingCallDemo';
import CallerIdSettings from '@/components/CallerIdSettings';

const Block: React.FC = () => {
  const [callerIdEnabled, setCallerIdEnabled] = useState(true);
  const [lookupTimeout, setLookupTimeout] = useState(5000);
  const [lookupContacts, setLookupContacts] = useState(false);
  
  // Mock blocked numbers
  const [blockedNumbers, setBlockedNumbers] = useState([
    { number: '+1 (555) 876-5432', name: 'Spam Caller', date: new Date() },
    { number: '+1 (555) 123-7890', name: 'Telemarketer', date: new Date(Date.now() - 86400000) },
  ]);

  return (
    <>
      <Header title="Call Blocking" transparent />
      <main className="page-container">
        <div className="space-y-6 mb-8 animate-fade-in">
          <div className="bg-card rounded-2xl overflow-hidden shadow-sm p-4">
            <h2 className="text-lg font-medium mb-4">Caller ID Lookup</h2>
            <IncomingCallDemo />
          </div>
          
          <div className="bg-card rounded-2xl overflow-hidden shadow-sm p-4">
            <h2 className="text-lg font-medium mb-4">Settings</h2>
            <CallerIdSettings 
              enabled={callerIdEnabled}
              onToggleEnabled={setCallerIdEnabled}
              timeout={lookupTimeout}
              onTimeoutChange={setLookupTimeout}
              lookupContacts={lookupContacts}
              onToggleLookupContacts={setLookupContacts}
            />
          </div>

          <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Blocked Numbers</h2>
                <span className="bg-caller-gray-100 text-caller-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  {blockedNumbers.length}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Input placeholder="Enter phone number" className="flex-1" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {blockedNumbers.length > 0 ? (
              <div>
                {blockedNumbers.map((blocked, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b last:border-b-0 border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-caller-red" />
                      <div>
                        <p className="font-medium">{blocked.name || blocked.number}</p>
                        {blocked.name && <p className="text-xs text-muted-foreground">{blocked.number}</p>}
                        <p className="text-xs text-muted-foreground">
                          Blocked on {blocked.date.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-caller-red">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-1">No Blocked Numbers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You haven't blocked any phone numbers yet
                </p>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Block a Number
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
};

export default Block;
