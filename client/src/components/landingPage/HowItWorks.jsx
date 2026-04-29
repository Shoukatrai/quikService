import React from "react";
import { Search, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Find Your Service",
    desc: "Search from thousands of verified professionals and gigs based on your needs.",
    icon: <Search className="text-indigo-600" size={32} />,
    color: "bg-indigo-50",
  },
  {
    id: 2,
    title: "Book Instantly",
    desc: "Select a time that works for you and book your service with just a few clicks.",
    icon: <Calendar className="text-blue-600" size={32} />,
    color: "bg-blue-50",
  },
  {
    id: 3,
    title: "Relax & Rate",
    desc: "Enjoy quality service and leave a review to help others find the best pros.",
    icon: <CheckCircle className="text-emerald-600" size={32} />,
    color: "bg-emerald-50",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/5 -skew-x-12 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-600 font-black uppercase tracking-widest text-xs"
          >
            Simple Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mt-4"
          >
            How <span className="text-indigo-600">QuickService</span> Works
          </motion.h2>
          <p className="text-slate-500 mt-4 font-medium text-lg">
            Getting your tasks done has never been this easy. Follow these three simple steps to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              {/* Connector Line (Desktop Only) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-dashed bg-slate-200 -z-10" />
              )}

              <div className="bg-white p-8 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 group-hover:-translate-y-2">
                <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  {step.icon}
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-black">
                    {step.id}
                  </span>
                  <h3 className="text-xl font-black text-slate-900">{step.title}</h3>
                </div>

                <p className="text-slate-500 font-medium leading-relaxed">
                  {step.desc}
                </p>

                <div className="mt-8 flex items-center gap-2 text-indigo-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;