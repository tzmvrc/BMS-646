/** @format */

const Event = require("../models/event_model");
const { deleteCloudinaryFile } = require("../database/cloudinary");

// ✅ Create Event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, color } = req.body;

    if (!title || !description || !date || !time || !color) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Event image is required." });
    }

    const imageUrl = req.file.path;
    let publicId = imageUrl
      .split("/")
      .slice(-2)
      .join("/")
      .replace(/\.[^.]+$/, "");
    publicId = decodeURIComponent(publicId);

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      color,
      image: {
        url: imageUrl,
        public_id: publicId,
      },
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({message:"Events retrieved successfully", count: events.length, data: events });
  } catch (error) {
    console.error("Get Events Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, color } = req.body;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (req.file) {
      // 🧼 Delete old image from Cloudinary
      if (event.image?.public_id) {
        await deleteCloudinaryFile(event.image.public_id);
      }

      const imageUrl = req.file.path;
      let publicId = imageUrl
        .split("/")
        .slice(-2)
        .join("/")
        .replace(/\.[^.]+$/, "");
      publicId = decodeURIComponent(publicId);

      event.image = {
        url: imageUrl,
        public_id: publicId,
      };
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.color = color || event.color;

    await event.save();

    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Update Event Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete Event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.image?.public_id) {
      await deleteCloudinaryFile(event.image.public_id);
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
