import { useState, useContext } from 'react';
import { ThemeContext } from '../../../Context/ThemeContext';
import { Monitor, Sun, Moon  } from 'lucide-react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-gray-900/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-3">
                        <div className="p-1 bg-black dark:bg-white rounded-lg">
                            <img 
                                src={theme === 'dark' ? '/favicon-dark.svg' : '/favicon.svg'} 
                                alt="realmeet logo" 
                                className="h-8 w-8 rounded-lg invert dark:invert-0"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                realmeet
                            </h1>
                            <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                                Real-time coding platform
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a 
                                href="#features" 
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                Features
                            </a>
                            <a 
                                href="#demo" 
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                Live Demo
                            </a>
                            <a 
                                href="#documentation" 
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                Docs
                            </a>
                            <a 
                                href="#pricing" 
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                Pricing
                            </a>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-3">
                        {/* Theme Toggle */}
                        <div className="relative flex items-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-0.5 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                            <button
                                onClick={() => setTheme('light')}
                                className={`relative p-1.5 rounded-md transition-all duration-200 ${
                                    theme === 'light' 
                                        ? 'bg-white dark:bg-gray-700 shadow-sm text-amber-500 dark:text-amber-400' 
                                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                                }`}
                                aria-label="Light theme"
                                title="Light theme"
                            >
                                <Sun size={14} className="transition-colors duration-200" />
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`relative p-1.5 rounded-md transition-all duration-200 ${
                                    theme === 'dark' 
                                        ? 'bg-gray-800 dark:bg-gray-600 shadow-sm text-blue-400 dark:text-blue-300' 
                                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                                }`}
                                aria-label="Dark theme"
                                title="Dark theme"
                            >
                                <Moon size={14} className="transition-colors duration-200" />
                            </button>
                            <button
                                onClick={() => setTheme('system')}
                                className={`relative p-1.5 rounded-md transition-all duration-200 ${
                                    theme === 'system' 
                                        ? 'bg-white dark:bg-gray-700 shadow-sm text-emerald-500 dark:text-emerald-400' 
                                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                                }`}
                                aria-label="System theme"
                                title="System theme"
                            >
                                <Monitor size={14} className="transition-colors duration-200" />
                            </button>
                        </div>

                        {/* GitHub Star Badge */}
                        <a 
                            href="https://github.com/PiyushAryan/realmeet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 bg-black dark:bg-gray-800 text-white dark:text-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-700 dark:border-gray-600 shadow-sm hover:shadow-md transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            {/* GitHub Logo */}
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            
                            {/* Star Icon */}
                            <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            
                            {/* Star Count */}
                            <span className="text-xs font-medium">0</span>
                        </a>

                        {/* CTA Buttons */}
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                            Sign In
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r bg-black hover:from-orange-600 hover:to-amber-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                        <a 
                            href="#features" 
                            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                        >
                            Features
                        </a>
                        <a 
                            href="#demo" 
                            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                        >
                            Live Demo
                        </a>
                        <a 
                            href="#documentation" 
                            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                        >
                            Documentation
                        </a>
                        <a 
                            href="#pricing" 
                            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                        >
                            Pricing
                        </a>
                        
                        {/* Mobile Actions */}
                        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between px-3">
                                <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-0.5">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`p-2 rounded-md transition-all duration-200 ${
                                            theme === 'light' 
                                                ? 'bg-white dark:bg-gray-700 shadow-sm text-amber-500' 
                                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                                        }`}
                                        aria-label="Light theme"
                                    >
                                        <Sun size={16} />
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`p-2 rounded-md transition-all duration-200 ${
                                            theme === 'dark' 
                                                ? 'bg-gray-800 dark:bg-gray-600 shadow-sm text-blue-400' 
                                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                                        }`}
                                        aria-label="Dark theme"
                                    >
                                        <Moon size={16} />
                                    </button>
                                    <button
                                        onClick={() => setTheme('system')}
                                        className={`p-2 rounded-md transition-all duration-200 ${
                                            theme === 'system' 
                                                ? 'bg-white dark:bg-gray-700 shadow-sm text-emerald-500' 
                                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                                        }`}
                                        aria-label="System theme"
                                    >
                                        <Monitor size={16} />
                                    </button>
                                </div>
                                
                                <a
                                    href="https://github.com/PiyushAryan/realmeet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                            
                            <div className="mt-3 space-y-2 px-3">
                                <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200">
                                    Sign In
                                </button>
                                <button className="block w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-base font-medium rounded-md transition-all duration-200">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
