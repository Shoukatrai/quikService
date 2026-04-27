import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Zap, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BecomeProvider = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-slate-900 rounded-[40px] overflow-hidden p-8 md:p-16">
          {/* Background Decorative Patterns */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" fill="none" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6 border border-indigo-500/20"
              >
                <Zap size={14} fill="currentColor" />
                Opportunities are waiting
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Start earning by <br />
                <span className="text-indigo-400">providing services</span>
              </h2>

              <p className="text-slate-400 text-lg font-medium mb-10 max-w-md">
                Join thousands of experts who have grown their business through QuickService. 
                Flexible hours, secure payments, and a steady flow of clients.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate("/become-seller")}
                  className="px-10 py-4 bg-indigo-600 hover:bg-white hover:text-slate-900 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 group shadow-xl shadow-indigo-500/20 active:scale-95"
                >
                  Join as a Pro
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-10 py-4 bg-transparent border border-slate-700 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">
                  Learn How it Works
                </button>
              </div>
            </div>

            {/* Right Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { 
                  icon: <Briefcase className="text-indigo-400" />, 
                  title: "Grow Business", 
                  desc: "Reach thousands of customers in your city easily." 
                },
                { 
                  icon: <Zap className="text-amber-400" />, 
                  title: "Instant Alerts", 
                  desc: "Get notified as soon as someone books your gig." 
                },
                { 
                  icon: <ShieldCheck className="text-emerald-400" />, 
                  title: "Secure Payouts", 
                  desc: "Payments are held safely and released on time." 
                },
                { 
                  icon: <Zap className="text-pink-400" />, 
                  title: "Full Control", 
                  desc: "Set your own prices and work on your schedule." 
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeProvider;