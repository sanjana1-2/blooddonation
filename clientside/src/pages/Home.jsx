import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  Search, 
  Users, 
  Clock, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Droplet
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import BloodyWaterEffect from '../components/BloodyWaterEffect'

import { donorsAPI, bloodBanksAPI, requestsAPI } from '../services/api'

const Home = () => {
  const [stats, setStats] = React.useState({
    donors: '...',
    bloodBanks: '...',
    requests: '...',
    livesSaved: '100k+'
  })

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const [donorsRes, bloodBanksRes, requestsRes] = await Promise.all([
          donorsAPI.getAll(),
          bloodBanksAPI.getAll(),
          requestsAPI.getAll()
        ])
        setStats({
          donors: `${donorsRes.data.length}+`,
          bloodBanks: `${bloodBanksRes.data.length}+`,
          requests: `${requestsRes.data.length}+`,
          livesSaved: '100k+' // Still hardcoded as no endpoint for this yet
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    fetchStats()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32">
        <BloodyWaterEffect />
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-[100px] rounded-full -z-10"></div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-4">
                <Badge variant="outline" className="w-fit px-4 py-1 border-rose-200 text-rose-600 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 rounded-full animate-pulse">
                  <Droplet className="w-3 h-3 mr-2 fill-rose-600" />
                  India's #1 Blood Donation Network
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  Every Drop Counts <br />
                  <span className="text-gradient">Save a Life Today</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                  Join our verified community of donors and blood banks. Your simple act of kindness can be someone's second chance at life.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg gradient-rose shadow-xl shadow-rose-500/20 hover:scale-105 transition-all water-ripple" asChild>
                  <Link to="/blood-banks">
                    Find Blood <Search className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/20 water-ripple" asChild>
                  <Link to="/donor-registration">
                    Register as Donor <Users className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-rose-500 flex items-center justify-center text-white text-xs font-bold">
                    +5k
                  </div>
                </div>
                <div className="text-sm text-slate-500">
                  <span className="font-bold text-slate-900 dark:text-white">5,000+</span> donors joined this week
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative lg:block"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 dark:border-white/10 backdrop-blur-sm">
                <img src="/hero.png" alt="Donate Blood" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass-premium p-4 rounded-2xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase">Verified</span>
                  <span className="text-[10px] text-slate-500">100% Safe Process</span>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass-premium p-4 rounded-2xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-lg animate-pulse">
                  <Activity size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase">Real-time</span>
                  <span className="text-[10px] text-slate-500">Urgent Match Found</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { label: 'Blood Banks', value: stats.bloodBanks, icon: <Activity className="text-rose-500" />, trend: '+12% this month' },
              { label: 'Active Donors', value: stats.donors, icon: <Users className="text-blue-500" />, trend: '+5k new users' },
              { label: 'Lives Saved', value: stats.livesSaved, icon: <Heart className="text-pink-500" />, trend: '2k this week' },
              { label: 'Service Hours', value: '24/7', icon: <Clock className="text-green-500" />, trend: 'Instant response' }
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col gap-2 p-6 rounded-3xl bg-card border border-border hover:border-rose-200 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-muted shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase tracking-wider">
                  <TrendingUp size={10} /> {stat.trend}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <Badge className="bg-rose-100 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400">Our Ecosystem</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Seamless Healthcare Integration</h2>
            <p className="text-slate-500 max-w-2xl text-lg italic">"A unified platform connecting every stakeholder in the blood donation life cycle."</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: <MapPin />, title: 'Find Blood', desc: 'Real-time availability of blood stock in verified banks across the country.', color: 'rose' },
              { icon: <Users />, title: 'Donor Network', desc: 'Connecting voluntary donors with urgent needs in their local community.', color: 'blue' },
              { icon: <Zap />, title: 'Emergency SOS', desc: 'Instant SOS alerts to nearby donors for critical blood requirements.', color: 'pink' },
              { icon: <Activity />, title: 'Digital History', desc: 'Get your digital donor card and track your donation history seamlessly.', color: 'green' }
            ].map((service, i) => (
              <motion.div key={i} variants={itemVariants} className="relative p-8 rounded-[2rem] bg-card border border-border shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden group">
                <div className={`absolute -right-8 -top-8 w-24 h-24 bg-${service.color}-500/5 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                <div className={`w-14 h-14 rounded-2xl bg-${service.color}-50 dark:bg-${service.color}-900/20 flex items-center justify-center text-${service.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.desc}</p>
                <Button variant="ghost" className="p-0 h-auto font-bold text-slate-900 dark:text-white hover:bg-transparent group-hover:text-rose-600 transition-colors">
                  Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[3rem] overflow-hidden gradient-rose p-12 lg:p-20 shadow-2xl shadow-rose-500/30">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex flex-col gap-6 text-center lg:text-left">
                <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">Become a Local Hero</h2>
                <p className="text-rose-50 max-w-xl text-lg">
                  Sign up today and get notified when someone in your city needs blood. Your donation can save up to 3 lives.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 rounded-full px-10 h-16 text-lg font-bold shadow-xl">
                  Register Now
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full px-10 h-16 text-lg font-bold">
                  View Emergency List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home