import React from "react";
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Star,
  Users,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";
import { useSelector } from "react-redux";

// Mock Data for Chart
const data = [
  { name: "Mon", earnings: 400 },
  { name: "Tue", earnings: 300 },
  { name: "Wed", earnings: 900 },
  { name: "Thu", earnings: 500 },
  { name: "Fri", earnings: 1200 },
  { name: "Sat", earnings: 1500 },
  { name: "Sun", earnings: 1100 },
];

const OverviewPage = () => {
  const {user} = useSelector((state) => state.user);
  return (
    <SellerDashboardLayout user={user}>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Good Morning, {user?.name}! 👋
            </h1>
            <p className="text-slate-500 font-medium">
              Here's what's happening with your business today.
            </p>
          </div>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-indigo-200 transition-all text-sm">
            Withdraw Earnings
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Earnings"
            value="$4,250"
            change="+12.5%"
            icon={<DollarSign className="text-emerald-600" />}
            color="bg-emerald-50"
          />
          <StatCard
            title="Active Projects"
            value="12"
            change="+2"
            icon={<Briefcase className="text-blue-600" />}
            color="bg-blue-50"
          />
          <StatCard
            title="Client Rating"
            value="4.9"
            change="Perfect"
            icon={<Star className="text-amber-600" />}
            color="bg-amber-50"
          />
          <StatCard
            title="Profile Visits"
            value="1,140"
            change="+18%"
            icon={<Users className="text-purple-600" />}
            color="bg-purple-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Earnings Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900">
                Earnings Analytics
              </h3>
              <select className="bg-slate-50 border-none rounded-xl text-sm font-bold p-2 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="colorEarnings"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorEarnings)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders/Tasks */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6">
              Upcoming Tasks
            </h3>
            <div className="space-y-6">
              <TaskItem
                title="Kitchen Leak Repair"
                time="Today, 2:00 PM"
                status="Priority"
              />
              <TaskItem
                title="Electrical Wiring"
                time="Tomorrow, 10:00 AM"
                status="Scheduled"
              />
              <TaskItem
                title="Client Consultation"
                time="25 Oct, 4:00 PM"
                status="Meeting"
              />
              <TaskItem title="Invoice #4421" time="Pending" status="Action" />
            </div>
            <button className="w-full mt-8 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-colors">
              View All Schedule
            </button>
          </div>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

// Helper Components
const StatCard = ({ title, value, change, icon, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>{icon}</div>
      <span className="flex items-center text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
        <TrendingUp size={10} className="mr-1" /> {change}
      </span>
    </div>
    <h4 className="text-slate-500 text-sm font-bold">{title}</h4>
    <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
  </motion.div>
);

const TaskItem = ({ title, time, status }) => (
  <div className="flex items-center gap-4 group cursor-pointer">
    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
      <Clock size={18} />
    </div>
    <div className="flex-1">
      <h5 className="text-sm font-bold text-slate-900">{title}</h5>
      <p className="text-xs text-slate-500 font-medium">{time}</p>
    </div>
    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
      {status}
    </span>
  </div>
);

export default OverviewPage;
