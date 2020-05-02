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
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           name: Alexander
 *           email: fake@email.com
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