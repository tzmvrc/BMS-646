import React from "react";
import {
  Users,
  ClipboardList,
  Plus,
  FileOutput,
  UserPlus,
  CalendarPlus,
  Star,
  ChevronRight,
  Calendar,
  FileText,
} from "lucide-react";
import StatCard from "../../../components/StatCard";
import QuickActionButton from "../../../components/QuickActionButton";
import MiniCalendar from "../../../components/MiniCalendar";
import AnnouncementList from "../../../components/AnnouncementList";
import RecentRequestList from "../../../components/RecentRequestList";
import {
  stats,
  announcements,
  events,
  recentRequests,
} from "../../../data/dashboardData";

const Dashboard = () => {
  const getEventsForDate = (dateStr) =>
    events.filter((ev) => ev.date === dateStr);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-3xl p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-gray-500 text-sm mb-1">Barangay Summary</h2>
            <p className="text-4xl font-bold mb-4">5,240 Residents</p>
            <div className="flex space-x-4"></div>
            <div>
              <h3 className="text-gray-500 text-sm my-4 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Official Barangay ID
              </h3>
              <div className="bg-gradient-to-r from-black to-gray-700 rounded-2xl p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-80">BARANGAY ID</p>
                    <p className="text-xl mt-6">BRGY-2023-0485</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-80">Barangay Captain</p>
                    <p className="text-lg">Maria Dela Cruz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Make left column wider using grid-cols-3 and col-span-2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column (wider) */}
            <div className="space-y-8 md:col-span-2">
              <MiniCalendar
                events={events}
                currentMonth={currentMonth}
                currentYear={currentYear}
                getEventsForDate={getEventsForDate}
              />
              <div>
                <RecentRequestList requests={recentRequests} />
              </div>
              {/* Additional Section: Recent Activities */}
              <div className="mt-10">
                <h3 className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" /> Recent Activities
                </h3>
                <div className="bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>
                      Juan Dela Cruz requested a Barangay Clearance.{" "}
                      <span className="text-xs text-gray-400">2 hours ago</span>
                    </li>
                    <li>
                      Maria Santos updated her resident information.{" "}
                      <span className="text-xs text-gray-400">5 hours ago</span>
                    </li>
                    <li>
                      Pedro Reyes submitted a complaint.{" "}
                      <span className="text-xs text-gray-400">Yesterday</span>
                    </li>
                    <li>
                      Barangay Assembly event was added.{" "}
                      <span className="text-xs text-gray-400">2 days ago</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column (narrower) */}
            <div className="space-y-8 md:col-span-1">
              <StatCard
                label="Population"
                icon={<Users className="w-5 h-5" />}
                color="bg-white"
                extra={
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>Purok 1</span>
                      <span>Purok 2</span>
                      <span>Purok 3</span>
                      <span>Purok 4</span>
                      <span>Purok 5</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                }
              />
              <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <QuickActionButton
                    icon={<Plus className="w-6 h-6 mb-1" />}
                    label="New Request"
                    color="green"
                  />
                  <QuickActionButton
                    icon={<UserPlus className="w-6 h-6 mb-1" />}
                    label="Add Resident"
                    color="purple"
                  />
                  <QuickActionButton
                    icon={<CalendarPlus className="w-6 h-6 mb-1" />}
                    label="Add Event"
                    color="orange"
                  />
                </div>
              </div>
              <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-2xl shadow-sm">
                <h3 className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" /> Monthly Requests
                </h3>
                <div className="flex items-end space-x-1 h-24 mb-2">
                  {[12, 8, 15, 10, 18, 22, 17, 19, 15, 13].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-black rounded-t-sm"
                        style={{ height: `${height * 3}%` }}
                      ></div>
                    )
                  )}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                  ].map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>
              <div>
                <AnnouncementList announcements={announcements} />
              </div>
              <StatCard
                label="Community Rating"
                value="4.8"
                icon={<Star className="w-4 h-4" />}
                color="bg-white"
                extra={
                  <div className="text-center">
                    <p className="text-yellow-600 font-medium mb-2">
                      Excellent
                    </p>
                    <div className="flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-5 h-5 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
