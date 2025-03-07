import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            {title}
          </h2>
          {subtitle && (
            <div className="flex items-center mt-1">
              {subtitle.toLowerCase().includes('match') && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                  <span className="w-2 h-2 mr-1 bg-green-400 rounded-full animate-pulse"></span>
                  LIVE
                </span>
              )}
              <span className="text-sm text-gray-400">
                {subtitle}
              </span>
            </div>
          )}
        </div>
        {actions && (
          <div className="flex mt-4 md:mt-0 md:ml-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
