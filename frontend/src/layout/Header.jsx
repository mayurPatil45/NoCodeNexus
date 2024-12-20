import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
        setMobileMenuOpen(false);
    };

    const handleAboutNavigation = () => {
        navigate('/about');
        setMobileMenuOpen(false);
    };

    const handleLoginNavigation = () => {
        navigate('/login');
        setMobileMenuOpen(false);
    };

    const handleSignupNavigation = () => {
        navigate('/signup');
        setMobileMenuOpen(false);
    };

    return (
        <header className="top-0 z-50 shadow-sm p-0.5">
           <nav className="container mx-auto px-4 py-8 flex justify-between items-center">
                <div
                    className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={handleClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleClick();
                        }
                    }}
                >
                    <div className="flex items-center">
                        <span className="text-3xl font-bold text-primary">NOC</span>
                        <Database className="text-5xl text-primary mt-1" />
                        <span className="text-3xl font-bold text-primary">DE</span>
                        <span className="text-3xl font-bold text-white">NEXUS</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <a href="#features" className="text-gray-400 hover:text-white">Services</a>
                    <a
                        onClick={handleAboutNavigation}
                        className="text-gray-400 hover:text-white cursor-pointer"
                    >
                        About
                    </a>

                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={handleLoginNavigation}
                        >
                            Login
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={handleSignupNavigation}>
                            Sign Up
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-700 focus:outline-none"
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <a href="#features" className="block py-2 text-gray-700">Services</a>
                        <a
                            onClick={handleAboutNavigation}
                            className="block py-2 text-gray-700 cursor-pointer"
                        >
                            About
                        </a>
                        <div className="flex space-x-2 pt-4">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleLoginNavigation}
                            >
                                Login
                            </Button>
                            <Button
                                className="w-full"
                                onClick={handleSignupNavigation}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header;