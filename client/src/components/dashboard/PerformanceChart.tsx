import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from '@/hooks/use-theme';

interface PerformanceChartProps {
  timeRange: 'day' | 'week' | 'month';
  onTimeRangeChange: (range: 'day' | 'week' | 'month') => void;
}

export default function PerformanceChart({ timeRange, onTimeRangeChange }: PerformanceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  // Sample data for the chart
  const chartData = {
    day: {
      labels: ['9am', '12pm', '3pm', '6pm', '9pm', '12am'],
      winRate: [62, 65, 60, 68, 72, 70],
      kda: [25, 30, 28, 35, 40, 38]
    },
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      winRate: [65, 59, 80, 81, 56, 75, 70],
      kda: [28, 48, 40, 52, 34, 60, 55]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      winRate: [68, 72, 70, 75],
      kda: [42, 45, 50, 55]
    }
  };

  useEffect(() => {
    if (!chartRef.current) return;

    // This would normally use a chart library like Chart.js
    // For this example, we'll create a simple SVG chart
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const data = chartData[timeRange];
    const width = chartRef.current.width;
    const height = chartRef.current.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set background
    ctx.fillStyle = 'rgba(45, 45, 45, 0.3)';
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i < 5; i++) {
      const y = height - (height / 5) * i - 30;
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
    }

    // Draw X-axis labels
    ctx.fillStyle = '#BDBDBD';
    ctx.font = '12px Roboto, sans-serif';
    ctx.textAlign = 'center';
    
    const xStep = (width - 70) / (data.labels.length - 1);
    data.labels.forEach((label, i) => {
      ctx.fillText(label, 50 + i * xStep, height - 10);
    });

    // Draw win rate line
    ctx.strokeStyle = '#5E35B1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const maxWinRate = Math.max(...data.winRate);
    data.winRate.forEach((value, i) => {
      const x = 50 + i * xStep;
      const y = height - ((value / 100) * (height - 60)) - 30;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      // Draw points
      ctx.fillStyle = '#5E35B1';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.stroke();

    // Draw KDA line
    ctx.strokeStyle = '#2979FF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const maxKDA = Math.max(...data.kda);
    data.kda.forEach((value, i) => {
      const x = 50 + i * xStep;
      const y = height - ((value / maxKDA) * (height - 60)) - 30;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      // Draw points
      ctx.fillStyle = '#2979FF';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.stroke();

    // Add legend
    ctx.fillStyle = '#BDBDBD';
    ctx.font = '14px Roboto, sans-serif';
    ctx.textAlign = 'left';
    
    // Win Rate legend
    ctx.fillStyle = '#5E35B1';
    ctx.fillRect(width - 160, 20, 14, 14);
    ctx.fillStyle = '#BDBDBD';
    ctx.fillText('Win Rate %', width - 140, 32);
    
    // KDA legend
    ctx.fillStyle = '#2979FF';
    ctx.fillRect(width - 160, 45, 14, 14);
    ctx.fillStyle = '#BDBDBD';
    ctx.fillText('KDA Ratio', width - 140, 57);

  }, [timeRange]);

  return (
    <Card className="overflow-hidden shadow-lg bg-surface bg-opacity-50 border-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Performance Metrics</h3>
          <div className="flex items-center space-x-2">
            <Button 
              variant={timeRange === 'day' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => onTimeRangeChange('day')}
              className={timeRange !== 'day' ? 'bg-surface text-gray-400 hover:bg-opacity-80' : ''}
            >
              Day
            </Button>
            <Button 
              variant={timeRange === 'week' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => onTimeRangeChange('week')}
              className={timeRange !== 'week' ? 'bg-surface text-gray-400 hover:bg-opacity-80' : ''}
            >
              Week
            </Button>
            <Button 
              variant={timeRange === 'month' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => onTimeRangeChange('month')}
              className={timeRange !== 'month' ? 'bg-surface text-gray-400 hover:bg-opacity-80' : ''}
            >
              Month
            </Button>
          </div>
        </div>
        <div className="h-60">
          <canvas ref={chartRef} width={800} height={240} />
        </div>
      </CardContent>
    </Card>
  );
}
