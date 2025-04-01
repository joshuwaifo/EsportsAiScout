import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface Skill {
  name: string;
  value: number;
}

interface PlayerSkillRadarProps {
  skills: Skill[];
  title?: string;
  color?: string;
}

export default function PlayerSkillRadar({ skills, title = "Player Skills", color = "#39FF14" }: PlayerSkillRadarProps) {
  // Format data for the radar chart
  const formatData = (skills: Skill[]) => {
    return skills.map(skill => ({
      subject: skill.name,
      A: skill.value,
      fullMark: 100
    }));
  };

  return (
    <Card className="shadow-lg bg-surface bg-opacity-50 border-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formatData(skills)}>
              <PolarGrid stroke="#444" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#ccc', fontSize: 12 }} 
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#ccc' }} />
              <Radar
                name="Skills"
                dataKey="A"
                stroke={color}
                fill={color}
                fillOpacity={0.5}
              />
              <RechartsTooltip 
                formatter={(value: number) => [`${value}/100`, 'Rating']}
                labelFormatter={(label: string) => label}
                contentStyle={{ backgroundColor: '#1e1e2e', borderColor: '#333', color: '#fff', fontSize: '12px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}