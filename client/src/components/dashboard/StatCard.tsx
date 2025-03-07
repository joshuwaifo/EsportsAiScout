import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
}

export default function StatCard({ title, value, change, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="p-5 overflow-hidden rounded-lg shadow bg-surface bg-opacity-50 hover:translate-y-[-5px] hover:shadow-lg transition-all duration-300">
      <div className="flex items-center">
        <div className="flex-shrink-0 p-3 rounded-md bg-primary bg-opacity-30">
          <Icon className="h-5 w-5 text-[#39FF14]" />
        </div>
        <div className="flex-1 w-0 ml-5">
          <dl>
            <dt className="text-sm font-medium truncate text-gray-400">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-white">
                {value}
              </div>
              <div className="flex items-baseline ml-2 text-sm font-semibold">
                <svg 
                  className={cn(
                    "self-center h-4 w-4",
                    trend === 'up' ? 'text-[#39FF14]' : 'text-red-500'
                  )}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={trend === 'up' 
                      ? "M5 10l7-7m0 0l7 7m-7-7v18" 
                      : "M19 14l-7 7m0 0l-7-7m7 7V3"
                    } 
                  />
                </svg>
                <span className={cn(
                  "ml-1",
                  trend === 'up' ? 'text-[#39FF14]' : 'text-red-500'
                )}>
                  {change}
                </span>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
