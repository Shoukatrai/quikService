import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaRegEnvelope, 
  FaPhoneAlt,
  FaPaperPlane 
} from 'react-icons/fa'; // Font Awesome category
import { IoLocationOutline } from 'react-icons/io5'; // Ionicons category

const Footer = () => {
  // Social Links with React Icons
  const socialLinks = [
    { Icon: FaInstagram, link: "#", color: "hover:bg-pink-600" },
    { Icon: FaTwitter, link: "#", color: "hover:bg-blue-400" },
    { Icon: FaLinkedinIn, link: "#", color: "hover:bg-blue-700" },
    { Icon: FaFacebookF, link: "#", color: "hover:bg-blue-600" }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">Q</span>
              </div>
              <span className="text-2xl font-black text-white tracking-tight">QuickService</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Connecting expert service providers with local customers. Your one-stop destination for all home and professional needs.
            </p>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((item, i) => (
                <a 
                  key={i} 
                  href={item.link} 
                  className={`w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white ${item.color} hover:border-transparent transition-all duration-300`}
                >
                  <item.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">Company</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Our Services</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* 3. Support */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">Support</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="flex items-center gap-3">
                <FaPhoneAlt size={14} className="text-indigo-500" /> +92 300 1234567
              </li>
              <li className="flex items-center gap-3">
                <FaRegEnvelope size={16} className="text-indigo-500" /> support@quickservice.com
              </li>
              <li className="flex items-center gap-3">
                <IoLocationOutline size={18} className="text-indigo-500" /> Karachi, Pakistan
              </li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">Stay Updated</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 outline-none focus:border-indigo-500 text-white text-sm transition-all"
              />
              <button className="absolute right-2 top-2 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all">
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-slate-500">
            © 2026 QuickService. Developed by <span className="text-indigo-400">Shoukat Rai</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;