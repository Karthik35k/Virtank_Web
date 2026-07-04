import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || "admin@virtank.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const username = process.env.ADMIN_USERNAME || "Admin";

  const existing = await User.findOne({ email });

  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
      console.log(`Updated existing user ${email} to admin role`);
    } else {
      console.log(`Admin user ${email} already exists`);
    }
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    username,
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log(`Admin user created: ${email}`);
  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
