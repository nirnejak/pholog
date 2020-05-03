const mongoose = require("mongoose");

/**
 * @swagger
 *  components:
 *    schemas:
 *      Document:
 *        type: object
 *        required:
 *          - mediaUrl
 *          - activities
 *          - experience
 *          - notes
 *          - user
 *        properties:
 *          mediaUrl:
 *            type: string
 *          activities:
 *            type: string
 *            description: Lorem Ipsum dolor set amet
 *          experience:
 *            type: string
 *            description: Contact Number for the user, needs to be unique. 
 *          notes:
 *            type: string
 *          user:
 *            type: string
 *        example:
 *           mediaUrl: https://example.com/image.png
 *           activities: ["outing", "travel","cooking"]
 *           experience: Good
 *           notes: A nice day at park
 *           user: 34750623845764
 */

const documentSchema = mongoose.Schema({
  mediaUrl: { type: String },
  activities: { type: Array, required: true },
  experience: { type: String, required: true },
  notes: { type: String },

  user: { type: User, require: true },

}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = Document = mongoose.model("Document", documentSchema);