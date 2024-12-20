import { useState } from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight, 
  PanelLeft 
} from 'lucide-react';

import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const SidebarItem = ({ icon: Icon, text, active, href = "#" }) => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a 
            href={href} 
            className={`
              flex items-center p-3 
              rounded-lg 
              transition-colors 
              duration-200
              ${active 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-accent text-muted-foreground hover:text-foreground'}
              ${isOpen ? 'w-full justify-start' : 'w-12 justify-center'}
            `}
          >
            <Icon className={`${isOpen ? 'mr-3' : ''}`} size={20} />
            {isOpen && <span className="text-sm font-medium">{text}</span>}
          </a>
        </TooltipTrigger>
        {!isOpen && (
          <TooltipContent side="right">
            {text}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <>
      {/* Mobile Responsive Sheet (Hamburger Menu) */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden fixed top-4 left-4 z-50">
          <Button variant="outline" size="icon">
            <PanelLeft className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[270px] p-0">
          <nav className="grid gap-2 p-4">
            <SidebarItem icon={Home} text="Home" active={true} />
            <SidebarItem icon={Users} text="Users" />
            <SidebarItem icon={Settings} text="Settings" />
            <SidebarItem icon={CreditCard} text="Billing" />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div 
        className={`
          hidden md:flex flex-col 
          h-screen 
          bg-background 
          border-r 
          fixed 
          left-0 
          top-0 
          z-40 
          shadow-lg 
          transition-all 
          duration-300 
          ${isOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Sidebar Toggle Button */}
        <div className="p-4 flex justify-end">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </Button>
        </div>

        {/* Sidebar Logo/Header */}
        <div className="
          flex 
          items-center 
          justify-center 
          p-4 
          border-b
        ">
          {isOpen ? (
            <h2 className="text-xl font-bold">Dashboard</h2>
          ) : (
            <PanelLeft size={24} />
          )}
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="flex-grow p-4 space-y-2">
          <SidebarItem icon={Home} text="Home" active={true} />
          <SidebarItem icon={Users} text="Users" />
          <SidebarItem icon={Settings} text="Settings" />
          <SidebarItem icon={CreditCard} text="Billing" />
        </nav>

        {/* Sidebar Footer */}
        <div className="
          p-4 
          border-t 
          text-center
        ">
          {isOpen ? (
            <p className="text-sm text-muted-foreground">© 2024 Your Company</p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Sidebar;