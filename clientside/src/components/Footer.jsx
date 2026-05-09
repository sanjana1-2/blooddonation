import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full -z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-rose rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="text-white fill-white" size={20} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                e<span className="text-rose-500">Raktkosh</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              National Blood Donation Portal of India. Connecting donors with those in need, saving lives one drop at a time. Empowering the nation through voluntary donation.
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="secondary" className="rounded-full bg-slate-800 border-slate-700 hover:bg-rose-500 hover:text-white transition-all">
                <Globe size={18} />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full bg-slate-800 border-slate-700 hover:bg-rose-500 hover:text-white transition-all">
                <Globe size={18} />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full bg-slate-800 border-slate-700 hover:bg-rose-500 hover:text-white transition-all">
                <Globe size={18} />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full bg-slate-800 border-slate-700 hover:bg-rose-500 hover:text-white transition-all">
                <Globe size={18} />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Blood Banks', 'Donor Search', 'Stock Availability', 'Donation Camps'].map((link) => (
                <li key={link}>
                  <Link to="#" className="hover:text-rose-500 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-rose-500 mt-1 shrink-0" size={18} />
                <span>Ministry of Health & Family Welfare, Nirman Bhawan, New Delhi</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-rose-500 shrink-0" size={18} />
                <span>Helpline: 1075 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-rose-500 shrink-0" size={18} />
                <span>contact@RaktSeva.in</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-4 text-sm">Stay updated with latest camps and news.</p>
            <div className="flex flex-col gap-3">
              <Input placeholder="Enter email" className="bg-slate-800 border-slate-700 rounded-xl focus:ring-rose-500" />
              <Button className="gradient-rose rounded-xl font-bold">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-800 mb-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm">&copy; {new Date().getFullYear()} RaktSeva Portal. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-slate-500">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Maintained by</span>
              <span className="text-sm text-white font-bold">Ministry of Health</span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center p-1">
               <img src="/govt-logo.png" alt="Govt Logo" className="max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer