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
 *          - contact
 *          - password
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
 *          password:
 *            type: string
 *          status:
 *            type: boolean
 *          isAdmin:
 *            type: boolean
 *        example:
 *           name: Jitendra Nirnejak
 *           email: hello@nirnejak.com
 *           contact: 7869290297
 *           avatarUrl: https://example.com/image.png
 */

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  contact: { type: String, required: true },
  name: { type: String, required: true },
  avatarUrl: { type: String },

  password: { type: String, required: true },

  status: { type: String, default: "active" },
  isAdmin: { type: Boolean, default: false },

}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = User = mongoose.model("User", userSchema);