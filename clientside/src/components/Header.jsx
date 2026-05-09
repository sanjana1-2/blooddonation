import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { logout, selectCurrentUser } from '../store/slices/authSlice'
import { 
  Heart, 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  PieChart, 
  MapPin, 
  Activity,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blood Banks', path: '/blood-banks' },
    { name: 'Register', path: '/donor-registration', publicOnly: true },
    { name: 'Emergency', path: '/emergency-request', publicOnly: true, variant: 'emergency' },
    { name: 'Donors', path: '/donor-list', protected: true },
    { name: 'Stock', path: '/blood-availability', protected: true },
    { name: 'Requests', path: '/blood-requests', protected: true },
    { name: 'Analytics', path: '/analytics', adminOnly: true },
  ]

  const filteredLinks = navLinks.filter(link => {
    if (link.adminOnly && user?.role !== 'admin') return false
    if (link.protected && !user) return false
    if (link.publicOnly && user) return false
    return true
  })

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled 
        ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-rose-100 dark:border-rose-900 shadow-sm py-2" 
        : "bg-transparent border-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 gradient-rose rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Heart className="text-white fill-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              e<span className="text-rose-600">Raktkosh</span>
            </span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-none">
              Save Lives
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {filteredLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                link.variant === 'emergency' 
                  ? "bg-rose-100 text-rose-600 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400" 
                  : "text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.toggleTheme) window.toggleTheme();
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center relative"
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-rose-100 dark:border-rose-900">
                      <AvatarImage src={user.avatar} alt={user.firstName} />
                      <AvatarFallback className="bg-rose-50 text-rose-600">
                        {user.firstName[0]}{user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(`/donor-profile/${user._id}`)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <PieChart className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-rose-600 focus:text-rose-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" asChild className="rounded-full">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full gradient-rose shadow-md hover:shadow-lg transition-all">
                <Link to="/register">Join Now</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-rose-100 dark:border-rose-900 p-4 shadow-xl"
          >
            <div className="flex flex-col gap-2">
              {filteredLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    link.variant === 'emergency' 
                      ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20" 
                      : "hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-rose-100 dark:border-rose-900">
                  <Button variant="outline" asChild onClick={() => setIsMobileMenuOpen(false)} className="rounded-xl">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild onClick={() => setIsMobileMenuOpen(false)} className="rounded-xl gradient-rose">
                    <Link to="/register">Join Now</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header