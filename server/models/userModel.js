import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "editor", "viewer"] },
});

const User = mongoose.model("User", userSchema);

export default User;
