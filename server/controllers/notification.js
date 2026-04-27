import Notification from "../models/Notification.js";

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      read: false,
    });

    res.status(200).json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Notifications fetching failed",
      error: error.message,
    });
  }
};

export const markNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { $set: { read: true } },
    );

    res.status(200).json({
      success: true,
      message: "notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
