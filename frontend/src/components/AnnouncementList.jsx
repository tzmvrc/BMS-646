import React from "react";
import { Star } from "lucide-react";

const AnnouncementList = ({ announcements }) => (
  <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-2xl shadow-sm">
    <h3 className="text-gray-500 text-sm mb-4 flex items-center gap-2">
      <Star className="w-4 h-4" /> Announcements
    </h3>
    <div className="space-y-3">
      {announcements.map((a, i) => (
        <div key={i} className="border-b pb-2 last:border-b-0 last:pb-0">
          <div className="font-semibold">{a.title}</div>
          <div className="text-xs text-gray-500">{a.date}</div>
          <div className="text-sm text-gray-700">{a.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AnnouncementList;
