import mongoose from 'mongoose';
import { DateTime } from 'luxon';

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      sparse: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please Enter a Valid Email Address!'],
    },
    fullName: {
      type: mongoose.Schema.Types.String,
      required: false,
      unique: false,
    },
    phoneNo: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
      minlength: 7,
      maxlength: 15,
      match: [/^[0-9]{7,15}$/, 'Phone Number Must Contain Only Digits (7 to 15 digits long)'],
    },
    profileIcon: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: '', // replace with default icon url
    },
    dob: {
      type: mongoose.Schema.Types.Date,
      required: false,
    },
    createdAt: {
      type: mongoose.Schema.Types.Number,
      default: () => DateTime.utc().toMillis(),
      immutable: true,
    },
    updatedAt: {
      type: mongoose.Schema.Types.Number,
      default: () => DateTime.utc().toMillis(),
    },
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
      currentTime: () => DateTime.utc().toMillis(),
    },
  },
);

const User = mongoose.model('user', userSchema);

export default User;
