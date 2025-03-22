
import React from 'react';
import CallCard, { CallData } from './CallCard';

// Mock data for recent calls
const mockCalls: CallData[] = [
  {
    id: '1',
    name: 'John Smith',
    number: '+1 (555) 123-4567',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    type: 'incoming',
    duration: 125,
    location: 'New York, NY'
  },
  {
    id: '2',
    number: '+1 (555) 987-6543',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: 'missed',
    location: 'San Francisco, CA'
  },
  {
    id: '3',
    name: 'Mom',
    number: '+1 (555) 234-5678',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    type: 'outgoing',
    duration: 350,
    location: 'Chicago, IL'
  },
  {
    id: '4',
    name: 'Pizza Delivery',
    number: '+1 (555) 776-2323',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: 'incoming',
    duration: 45,
    location: 'Local Business'
  },
  {
    id: '5',
    number: '+1 (555) 888-9999',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
    type: 'unknown',
    location: 'Unknown'
  }
];

const RecentCalls: React.FC = () => {
  return (
    <div className="space-y-1">
      <div className="px-4 py-2">
        <h2 className="text-lg font-medium">Recent</h2>
      </div>
      <div className="space-y-1">
        {mockCalls.map((call) => (
          <CallCard key={call.id} call={call} />
        ))}
      </div>
    </div>
  );
};

export default RecentCalls;
