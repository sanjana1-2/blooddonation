import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/slices/authSlice'
import { authAPI } from '../services/api'
import { 
  Heart, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Building,
  Loader2
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'react-hot-toast'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'donor'
  })
  const [isLoading, setIsLoading] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      const { confirmPassword, ...registerData } = formData
      const response = await authAPI.register(registerData)
      dispatch(setCredentials(response.data))
      toast.success('Account created successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 py-12 relative">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full -z-10"></div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl"
      >
        <Card className="glass border-rose-100 dark:border-rose-900 shadow-2xl overflow-hidden">
          <CardHeader className="space-y-1 text-center pb-8 border-b border-rose-100/50 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-900/10">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 gradient-rose rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="text-white fill-white" size={24} />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Join RaktSeva</CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Create your account to start saving lives
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="firstName" name="firstName" placeholder="John" className="pl-10 rounded-xl"
                      value={formData.firstName} onChange={handleChange} required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" name="lastName" placeholder="Doe" className="rounded-xl"
                    value={formData.lastName} onChange={handleChange} required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="email" name="email" type="email" placeholder="john@example.com" className="pl-10 rounded-xl"
                      value={formData.email} onChange={handleChange} required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="phone" name="phone" type="tel" placeholder="+91 98765 43210" className="pl-10 rounded-xl"
                      value={formData.phone} onChange={handleChange} required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Account Type</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="donor" className="rounded-lg">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-rose-600" />
                        <span>Blood Donor</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="bloodbank" className="rounded-lg">
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-blue-600" />
                        <span>Blood Bank</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="hospital" className="rounded-lg">
                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-green-600" />
                        <span>Hospital</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="password" name="password" type="password" placeholder="••••••••" className="pl-10 rounded-xl"
                      value={formData.password} onChange={handleChange} required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" className="pl-10 rounded-xl"
                      value={formData.confirmPassword} onChange={handleChange} required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full gradient-rose rounded-xl py-6 text-lg font-bold shadow-lg shadow-rose-500/20" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center pb-8 pt-2">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-rose-600 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default Register