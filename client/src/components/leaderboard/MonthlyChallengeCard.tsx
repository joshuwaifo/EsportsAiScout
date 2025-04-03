import React from 'react';
import { MonthlyChallenge } from '@/types/leaderboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, Users, Award } from 'lucide-react';
import BadgeIcon from './BadgeIcon';

interface MonthlyChallengeCardProps {
  challenge: MonthlyChallenge;
}

export default function MonthlyChallengeCard({ challenge }: MonthlyChallengeCardProps) {
  // Calculate days remaining
  const endDate = new Date(challenge.endDate);
  const today = new Date();
  const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Card className="bg-surface border-gray-700 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold flex items-center">
              <Award className="mr-2 h-5 w-5 text-accent" />
              {challenge.title}
            </CardTitle>
            <CardDescription className="mt-1">
              {challenge.description}
            </CardDescription>
          </div>
          <BadgeIcon badge={challenge.reward} size="lg" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Your Progress</span>
            <span className="font-medium">{challenge.progress}%</span>
          </div>
          <Progress value={challenge.progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center text-gray-400">
            <CalendarDays className="h-4 w-4 mr-1.5" />
            <span>{daysRemaining} days remaining</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Users className="h-4 w-4 mr-1.5" />
            <span>{challenge.participants} participants</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}