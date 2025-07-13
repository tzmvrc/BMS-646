import React, { useState } from "react";
import { Calendar, Plus, X } from "lucide-react";

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
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=200&q=80",
    color: "#a5d8ff",
  },
  {
    id: 2,
    title: "Medical Mission",
    date: "2025-07-18",
    time: "7:00 AM",
    description: "Free medical checkup and consultation for all residents.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&h=200&q=80",
    color: "#c3f584",
  },
  {
    id: 3,
    title: "Cleanup Drive",
    date: "2025-07-24",
    time: "8:00 AM",
    description: "Community cleanup drive. Volunteers are welcome.",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=200&q=80",
    color: "#ffd6e0",
  },
  {
    id: 4,
    title: "Accountant",
    date: "2025-07-24",
    time: "1:45 PM",
    description: "Barangay accountant visit for financial consultation.",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&h=200&q=80",
    color: "#fff3bf",
  },
  {
    id: 5,
    title: "Team Dinner",
    date: "2025-07-30",
    time: "5:30 PM",
    description: "Barangay officials team dinner.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=400&h=200&q=80",
    color: "#f1c0e8",
  },
];

const Events = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Add Event Form State
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    image: "",
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
      image: "",
      color: "#a5d8ff",
    });
    setShowAddModal(true);
  };

  // Handle event click: show event details modal
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  // Handle add event submit
  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([
      ...events,
      {
        ...newEvent,
        id: Date.now(),
      },
    ]);
    setShowAddModal(false);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      description: "",
      image: "",
      color: "#a5d8ff",
    });
    setSelectedDate(null);
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
    <div className="min-h-screen  bg-white rounded-lg shadow-md p-6 mt-6 max-w-7xl mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Events Calendar</h1>
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
                image: "",
                color: "#a5d8ff",
              });
            }}
          >
            <Plus size={18} /> Add Event
          </button>
        </div>
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
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
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
        <div className="fixed inset-0 bg-gray-950/80 flex items-center justify-center p-4 z-50">
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
                  Image URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newEvent.image}
                  onChange={(e) =>
                    setNewEvent((ev) => ({ ...ev, image: e.target.value }))
                  }
                  placeholder="https://example.com/image.jpg"
                />
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
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
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
    </div>
  );
};

export default Events;
