import { Request, Response } from "express";
import Doctor from "../models/Doctor";
/**
 * @swagger
 * /doctors/raw:
 *   get:
 *     summary: Get all doctors (raw list, no pagination)
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: Raw list of all doctors
 */

export const getDoctors = async (_req: Request, res: Response) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};
/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specialty
 *               - availability
 *               - location
 *               - contact
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *               availability:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       201:
 *         description: Doctor created successfully
 */

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
/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update an existing doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *               availability:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       404:
 *         description: Doctor not found
 */

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

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       404:
 *         description: Doctor not found
 */

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
