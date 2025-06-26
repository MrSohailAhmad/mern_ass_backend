import { Request, Response } from "express";
import Doctor from "../models/Doctor";

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const total = await Doctor.countDocuments();
    const doctors = await Doctor.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      doctors,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

export const createDoctor = async (req: Request, res: Response) => {
  const { name, specialty, availability, location, contact } = req.body;
  const doctor = new Doctor({
    name,
    specialty,
    availability,
    location,
    contact,
  });
  await doctor.save();
  res.status(201).json({ message: "Doctor created", doctor });
};

export const updateDoctor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;

  const doctor = await Doctor.findByIdAndUpdate(id, update, { new: true });
  if (!doctor) {
    res.status(404).json({ message: "Doctor not found" });
    return;
  }

  res.json({ message: "Doctor updated", doctor });
};

export const deleteDoctor = async (req: Request, res: Response) => {
  const { id } = req.params;

  const doctor = await Doctor.findByIdAndDelete(id);
  if (!doctor) {
    res.status(404).json({ message: "Doctor not found" });
    return;
  }

  res.json({ message: "Doctor deleted" });
};

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const search = req.query.search?.toString() || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { specialty: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ],
    };

    const total = await Doctor.countDocuments(query);
    const doctors = await Doctor.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      doctors,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};
