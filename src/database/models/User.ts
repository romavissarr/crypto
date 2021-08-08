import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  // blockChain: {
  //   type: Array,
  //   required: true,
  // },
});

export const UserModel = mongoose.model("users", UserSchema);
