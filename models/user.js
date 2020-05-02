const mongoose = require("mongoose");

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          contact:
 *            type: string
 *            format: email
 *            description: Contact Number for the user, needs to be unique.
 *          name:
 *            type: string
 *          avatarUrl:
 *            type: string
 *            description: URL for the user profile Picture
 *        example:
 *           name: Jitendra Nirnejak
 *           email: hello@nirnejak.com
 */

const userSchema = mongoose.Schema({
  email: { type: String },
  contact: { type: String },
  name: { type: String },
  avatarUrl: { type: String, required: true },

  password: { type: String },
  token: { type: String, required: true },

  status: { type: String, default: "active" },
  isAdmin: { type: Boolean, default: false },

}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = User = mongoose.model("User", userSchema);