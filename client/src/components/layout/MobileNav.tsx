import { Link, useLocation } from "wouter";
import { 
  LayoutDashboardIcon, 
  SearchIcon, 
  BrainIcon, 
  UsersIcon,
  InfoIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const [location] = useLocation();

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboardIcon },
    { name: 'Scouting', href: '/scouting', icon: SearchIcon },
    { name: 'Strategy', href: '/strategy', icon: BrainIcon },
    { name: 'Team', href: '/team', icon: UsersIcon },
    { name: 'About', href: '/about', icon: InfoIcon },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around h-16 bg-surface lg:hidden">
      {navigationItems.map((item) => {
        const isActive = location === item.href || 
          (item.href !== '/' && location.startsWith(item.href));
        
        return (
          <Link key={item.name} href={item.href} className={cn(
            "flex flex-col items-center justify-center flex-1 h-full",
            isActive ? "text-primary" : "text-gray-400"
          )}>
            <item.icon className="text-lg h-5 w-5" />
            <span className="mt-1 text-xs">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
