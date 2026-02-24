import Contact from "../models/contact.model.js";
import AppError from "../utils/error.util.js";

const createContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return next(new AppError("Name, email and message are required", 400));
    }

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      contact
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export default createContact;