import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/slices/authSlice'
import { authAPI } from '../services/api'
import { 
  Heart, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  User,
  Building,
  Loader2
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await authAPI.login(formData)
      dispatch(setCredentials(response.data))
      toast.success(`Welcome back, ${response.data.user.firstName}!`)
      navigate(from)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (email, password) => {
    setIsLoading(true)
    try {
      const response = await authAPI.login({ email, password })
      dispatch(setCredentials(response.data))
      toast.success(`Demo login successful!`)
      navigate('/')
    } catch (error) {
      toast.error('Demo login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 relative">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full -z-10"></div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="glass border-rose-100 dark:border-rose-900 shadow-2xl overflow-hidden">
          <CardHeader className="space-y-1 text-center pb-8 border-b border-rose-100/50 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-900/10">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 gradient-rose rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="text-white fill-white" size={24} />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 rounded-xl border-slate-200 dark:border-slate-800 focus:ring-rose-500" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" size="sm" className="text-xs text-rose-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="password" 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 pr-10 rounded-xl border-slate-200 dark:border-slate-800 focus:ring-rose-500" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full gradient-rose rounded-xl py-6 text-lg font-bold shadow-lg shadow-rose-500/20" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <div className="px-8 pb-8 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">Or continue with demo</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" size="sm" className="rounded-xl flex flex-col gap-1 h-auto py-3 border-rose-100 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/20" onClick={() => handleDemoLogin('admin@eraktkosh.in', 'admin123')}>
                <ShieldCheck size={16} className="text-rose-600" />
                <span className="text-[10px] font-bold">Admin</span>
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl flex flex-col gap-1 h-auto py-3 border-rose-100 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/20" onClick={() => handleDemoLogin('donor@eraktkosh.in', 'donor123')}>
                <User size={16} className="text-blue-600" />
                <span className="text-[10px] font-bold">Donor</span>
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl flex flex-col gap-1 h-auto py-3 border-rose-100 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/20" onClick={() => handleDemoLogin('hospital@eraktkosh.in', 'hospital123')}>
                <Building size={16} className="text-green-600" />
                <span className="text-[10px] font-bold">Hospital</span>
              </Button>
            </div>

            <CardFooter className="justify-center p-0">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-rose-600 font-bold hover:underline">
                  Create Account
                </Link>
              </p>
            </CardFooter>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login