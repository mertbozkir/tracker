import React, { useState, useEffect } from 'react';
import { Check, Clock, X } from 'lucide-react';
import challengesData from './data.json';

interface Challenge {
  id: number;
  title: string;
  text: string;
  status: 'pending' | 'done' | 'missed';
}

function PostItNote({ challenge }: { challenge: Challenge }) {
  const getStatusIcon = () => {
    switch (challenge.status) {
      case 'done':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'missed':
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (challenge.status) {
      case 'done':
        return 'text-green-800 font-bold';
      case 'missed':
        return 'text-red-800 font-bold';
      default:
        return 'text-gray-800 font-bold';
    }
  };

  const getRotation = () => {
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
    return rotations[challenge.id % rotations.length];
  };

  return (
    <div
      className={`
        relative bg-yellow-200 p-4 rounded-sm shadow-md
        transform transition-all duration-300
        ${getRotation()}
        border-t-4 border-yellow-300
      `}
      style={{
        background: 'linear-gradient(135deg, #FFE066 0%, #FDD835 100%)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-yellow-800 bg-yellow-300 px-2 py-1 rounded">
          #{challenge.id}
        </span>
        {getStatusIcon()}
      </div>
      
      <h3 className={`text-sm font-medium leading-tight ${getStatusColor()}`}>
        {challenge.status !== 'pending' ? challenge.title : ''}
      </h3>
      
      {/* Post-it note hole effect */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-inner"></div>
    </div>
  );
}

function App() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    setChallenges(challengesData.challenges);
  }, []);

  const getStatusCounts = () => {
    return challenges.reduce(
      (acc, challenge) => {
        acc[challenge.status]++;
        return acc;
      },
      { pending: 0, done: 0, missed: 0 }
    );
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          <a 
            href="https://www.instagram.com/mert_xai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors duration-200 underline decoration-2 underline-offset-4"
          >
            Mert Bozkir
          </a>
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          #PBC30 - Personal Brand Building Challenge
        </p>
        <div className="flex justify-center space-x-8 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Done: {statusCounts.done}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
            <span>Pending: {statusCounts.pending}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Missed: {statusCounts.missed}</span>
          </div>
        </div>
      </header>

      {/* Post-it Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
          {challenges.map((challenge) => (
            <PostItNote
              key={challenge.id}
              challenge={challenge}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4">
        <p className="text-gray-600">
          Inspired by{' '}
          <a
            href="https://www.instagram.com/jimruitang"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition-colors duration-200 underline"
          >
            Jim Tang
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;