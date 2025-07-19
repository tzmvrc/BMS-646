import React, { useState } from "react";
import { Calendar, Plus, X, Megaphone } from "lucide-react";

// Simple calendar grid helper
function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let days = [];
  let week = [];
  let dayNum = 1 - firstDay;
  for (let i = 0; i < 6; i++) {
    week = [];
    for (let j = 0; j < 7; j++, dayNum++) {
      if (dayNum > 0 && dayNum <= daysInMonth) {
        week.push(dayNum);
      } else {
        week.push(null);
      }
    }
    days.push(week);
  }
  return days;
}

const initialEvents = [
  {
    id: 1,
    title: "Barangay Assembly",
    date: "2025-07-17",
    time: "9:00 AM",
    description: "Quarterly barangay assembly for all residents.",
    image: null,
    color: "#a5d8ff",
  },
  {
    id: 2,
    title: "Medical Mission",
    date: "2025-07-18",
    time: "7:00 AM",
    description: "Free medical checkup and consultation for all residents.",
    image: null,
    color: "#c3f584",
  },
  {
    id: 3,
    title: "Cleanup Drive",
    date: "2025-07-24",
    time: "8:00 AM",
    description: "Community cleanup drive. Volunteers are welcome.",
    image: null,
    color: "#ffd6e0",
  },
  {
    id: 4,
    title: "Accountant",
    date: "2025-07-24",
    time: "1:45 PM",
    description: "Barangay accountant visit for financial consultation.",
    image: null,
    color: "#fff3bf",
  },
  {
    id: 5,
    title: "Team Dinner",
    date: "2025-07-30",
    time: "5:30 PM",
    description: "Barangay officials team dinner.",
    image: null,
    color: "#f1c0e8",
  },
];

const initialAnnouncements = [
  {
    id: 1,
    title: "Water Interruption Schedule",
    date: "2025-07-16",
    description:
      "Water supply will be temporarily interrupted on July 20 from 8AM to 4PM for pipeline maintenance. Please store enough water for your needs.",
    urgent: true,
  },
  {
    id: 2,
    title: "New Barangay Health Center Hours",
    date: "2025-07-10",
    description:
      "Starting next week, the health center will be open until 7PM every Wednesday to accommodate working residents.",
    urgent: false,
  },
  {
    id: 3,
    title: "Community Survey",
    date: "2025-07-05",
    description:
      "We're conducting a survey to improve barangay services. Please visit the barangay hall to participate or complete the online form.",
    urgent: false,
  },
];

const Events = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState(initialEvents);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showAddAnnouncementModal, setShowAddAnnouncementModal] =
    useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    urgent: false,
  });

  // Add Event Form State
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    image: null,
    previewImage: null,
    color: "#a5d8ff",
  });

  // Calendar grid
  const monthDays = getMonthDays(currentYear, currentMonth);

  // Get events for a specific date
  const getEventsForDate = (dateStr) =>
    events.filter((ev) => ev.date === dateStr);

  // Handle calendar navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Handle date click: open add event modal with date prefilled
  const handleDateClick = (day) => {
    if (!day) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setNewEvent({
      title: "",
      date: dateStr,
      time: "",
      description: "",
      image: null,
      previewImage: null,
      color: "#a5d8ff",
    });
    setShowAddModal(true);
  };

  // Handle event click: show event details modal
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  // Handle announcement click
  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowAnnouncementModal(true);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent({
          ...newEvent,
          image: file,
          previewImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle add event submit
  const handleAddEvent = (e) => {
    e.preventDefault();

    // Create a mock URL for the image (in a real app, you would upload to a server)
    const imageUrl = newEvent.image
      ? URL.createObjectURL(newEvent.image)
      : null;

    setEvents([
      ...events,
      {
        ...newEvent,
        id: Date.now(),
        image: imageUrl,
      },
    ]);
    setShowAddModal(false);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      description: "",
      image: null,
      previewImage: null,
      color: "#a5d8ff",
    });
    setSelectedDate(null);
  };

  // Handle add announcement submit
  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    setAnnouncements([
      {
        ...newAnnouncement,
        id: Date.now(),
        date: today,
      },
      ...announcements,
    ]);
    setShowAddAnnouncementModal(false);
    setNewAnnouncement({
      title: "",
      description: "",
      urgent: false,
    });
  };

  // Color palette for events
  const colorOptions = [
    "#a5d8ff",
    "#c3f584",
    "#ffd6e0",
    "#fff3bf",
    "#f1c0e8",
    "#b197fc",
  ];

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  



  return (
    <div className="min-h-screen mt-6">
      <div className="max-w-7xl mx-auto ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Events & Announcements
          </h1>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              onClick={() => setShowAddAnnouncementModal(true)}
            >
              <Megaphone size={18} /> Add Announcement
            </button>
            <button
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              onClick={() => {
                setSelectedDate(null);
                setShowAddModal(true);
                setNewEvent({
                  title: "",
                  date: "",
                  time: "",
                  description: "",
                  image: null,
                  previewImage: null,
                  color: "#a5d8ff",
                });
              }}
            >
              <Plus size={18} /> Add Event
            </button>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Latest Announcements
            </h2>
          </div>

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`p-4 rounded-lg border cursor-pointer transition hover:border-black ${
                  announcement.urgent
                    ? "border-red-200 bg-red-50"
                    : "border-gray-100 bg-gray-50"
                }`}
                onClick={() => handleAnnouncementClick(announcement)}
              >
                <div className="flex justify-between items-start">
                  <h3
                    className={`font-medium ${
                      announcement.urgent ? "text-red-700" : "text-gray-800"
                    }`}
                  >
                    {announcement.title}
                    {announcement.urgent && (
                      <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                        Urgent
                      </span>
                    )}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {announcement.date}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {announcement.description}
                </p>
                <div className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                  Read more...
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              className="text-gray-500 hover:text-black px-2 py-1 rounded"
              onClick={handlePrevMonth}
            >
              &lt;
            </button>
            <div className="font-semibold text-lg">
              {monthNames[currentMonth]} {currentYear}
            </div>
            <button
              className="text-gray-500 hover:text-black px-2 py-1 rounded"
              onClick={handleNextMonth}
            >
              &gt;
            </button>
          </div>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-500 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {monthDays.flat().map((day, idx) => {
              const dateStr = day
                ? `${currentYear}-${String(currentMonth + 1).padStart(
                    2,
                    "0"
                  )}-${String(day).padStart(2, "0")}`
                : null;
              const dayEvents = dateStr ? getEventsForDate(dateStr) : [];
              const isToday =
                day &&
                new Date().getFullYear() === currentYear &&
                new Date().getMonth() === currentMonth &&
                new Date().getDate() === day;
              return (
                <div
                  key={idx}
                  className={`min-h-[60px] rounded-lg border border-gray-100 bg-gray-50 relative group cursor-pointer transition
                    ${isToday ? "border-black bg-[#e3fafc]" : ""}
                    ${
                      day
                        ? "hover:border-black hover:bg-[#f1f5fd]"
                        : "opacity-0 pointer-events-none"
                    }
                  `}
                  onClick={() => handleDateClick(day)}
                >
                  {day && (
                    <>
                      <div className="absolute top-1 left-2 text-xs font-semibold text-gray-700">
                        {day}
                      </div>
                      <div className="flex flex-col gap-1 mt-5">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <button
                            key={ev.id}
                            className="truncate px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              background: ev.color,
                              color: "#222",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventClick(ev);
                            }}
                          >
                            {ev.title}
                          </button>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{dayEvents.length - 2} more...
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* List of events for the month */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            This Month's Events
          </h2>
          <div className="flex flex-col gap-4">
            {events
              .filter(
                (ev) =>
                  new Date(ev.date).getMonth() === currentMonth &&
                  new Date(ev.date).getFullYear() === currentYear
              )
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:border-black cursor-pointer"
                  onClick={() => handleEventClick(ev)}
                >
                  <div
                    className="w-2 h-10 rounded-full"
                    style={{ background: ev.color }}
                  ></div>
                  {ev.image ? (
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg border flex items-center justify-center">
                      <Calendar className="text-gray-400" size={24} />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-bold text-gray-800">{ev.title}</div>
                    <div className="text-xs text-gray-500">
                      {ev.date} • {ev.time}
                    </div>
                    <div className="text-sm text-gray-700 truncate">
                      {ev.description}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-950/80 flex items-center justify-center p-4 z-50  ">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-black"
              onClick={() => setShowAddModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Add Event</h2>
            <form
              onSubmit={handleAddEvent}
              className="flex flex-col gap-4"
              autoComplete="off"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent((ev) => ({ ...ev, title: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent((ev) => ({ ...ev, date: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent((ev) => ({ ...ev, time: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent((ev) => ({
                      ...ev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Image
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer">
                    <div className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                      Choose Image
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  {newEvent.previewImage && (
                    <div className="relative">
                      <img
                        src={newEvent.previewImage}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() =>
                          setNewEvent({
                            ...newEvent,
                            image: null,
                            previewImage: null,
                          })
                        }
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-6 h-6 rounded-full border-2 ${
                        newEvent.color === color
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                      style={{ background: color }}
                      onClick={() => setNewEvent((ev) => ({ ...ev, color }))}
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Announcement Modal */}
      {showAddAnnouncementModal && (
        <div className="fixed inset-0 bg-gray-950/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-black"
              onClick={() => setShowAddAnnouncementModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Add Announcement</h2>
            <form
              onSubmit={handleAddAnnouncement}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newAnnouncement.title}
                  onChange={(e) =>
                    setNewAnnouncement((a) => ({ ...a, title: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newAnnouncement.description}
                  onChange={(e) =>
                    setNewAnnouncement((a) => ({
                      ...a,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urgent"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  checked={newAnnouncement.urgent}
                  onChange={(e) =>
                    setNewAnnouncement((a) => ({
                      ...a,
                      urgent: e.target.checked,
                    }))
                  }
                />
                <label
                  htmlFor="urgent"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Mark as urgent
                </label>
              </div>
              <button
                type="submit"
                className="mt-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Add Announcement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-gray-950/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-black"
              onClick={() => setShowEventModal(false)}
            >
              <X size={20} />
            </button>
            {selectedEvent.image ? (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <Calendar className="text-gray-400" size={40} />
              </div>
            )}
            <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
            <div className="text-gray-500 text-sm mb-2">
              {selectedEvent.date} • {selectedEvent.time}
            </div>
            <div className="mb-2 text-gray-700">
              {selectedEvent.description}
            </div>
            <div className="flex gap-2 mt-2">
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ background: selectedEvent.color }}
              ></span>
              <span className="text-xs text-gray-500">Event color</span>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Details Modal */}
      {showAnnouncementModal && selectedAnnouncement && (
        <div className="fixed inset-0 bg-gray-950/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-black"
              onClick={() => setShowAnnouncementModal(false)}
            >
              <X size={20} />
            </button>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-1">
                {selectedAnnouncement.title}
              </h2>
              <div className="text-sm text-gray-500">
                Posted on {selectedAnnouncement.date}
                {selectedAnnouncement.urgent && (
                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                    Urgent
                  </span>
                )}
              </div>
            </div>
            <div
              className={`p-4 rounded-lg mb-4 ${
                selectedAnnouncement.urgent
                  ? "bg-red-50 border border-red-200"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <p className="text-gray-700 whitespace-pre-line">
                {selectedAnnouncement.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
