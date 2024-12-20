import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Settings, 
  CreditCard,
  ChevronLeft, 
  ChevronRight, 
  PanelLeft,
  LogOut,
  User,
  Activity,
  Calendar
} from 'lucide-react';

import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar */}
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
        <div className="p-4 flex justify-end">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </Button>
        </div>

        <div className="flex items-center justify-center p-4 border-b">
          {isOpen ? (
            <h2 className="text-xl font-bold">Dashboard</h2>
          ) : (
            <PanelLeft size={24} />
          )}
        </div>

        <nav className="flex-grow p-4 space-y-2">
          <SidebarItem icon={Home} text="Home" active={true} />
          <SidebarItem icon={Users} text="Users" />
          <SidebarItem icon={Settings} text="Settings" />
          <SidebarItem icon={CreditCard} text="Billing" />
        </nav>

        <div className="p-4 border-t text-center">
          {isOpen && (
            <p className="text-sm text-muted-foreground">© 2024 Your Company</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-xl font-bold">Dashboard</h1>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4">
                <User className="w-8 h-8 text-blue-500" />
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Welcome back, {user?.name}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center space-x-4">
                <Activity className="w-8 h-8 text-green-500" />
                <CardTitle>Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your recent activity will appear here</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center space-x-4">
                <Calendar className="w-8 h-8 text-purple-500" />
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your upcoming events will appear here</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;