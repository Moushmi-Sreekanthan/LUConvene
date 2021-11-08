const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    departmentname: {
      type: String,
      required: true,
    },
    status:{
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);
