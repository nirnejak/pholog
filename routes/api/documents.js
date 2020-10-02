const express = require("express")

const isAuthenticated = require("../../middlewares/auth")

const Document = require("../../models/document")

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Document management
 */

/**
 * @swagger
 * path:
 *  /documents/:
 *    get:
 *      summary: List documents
 *      tags: [Documents]
 *      responses:
 *        "200":
 *          description: List of documents
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Document'
 */
router.get("/", isAuthenticated, (req, res) => {
  Document.findAll({ user: req.user._id })
    .then(documents => res.json({ documents }))
    .catch(error => res.status(500).json({ message: error.message }))
})

/**
 * @swagger
 * path:
 *  /documents/:id:
 *    get:
 *      summary: Get a document
 *      tags: [Documents]
 *      responses:
 *        "200":
 *          description: A document schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.get("/:id", isAuthenticated, (req, res) => {
  User.findOne({ id: req.params._id })
    .then(user => user ? res.status(404).json({ message: `No user found with email: ${res.params.email}` }) : res.json({ user }))
    .catch(error => res.status(500).json({ message: error.message }))
})

/**
 * @swagger
 * path:
 *  /users/:email:
 *    put:
 *      summary: Update a user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.put("/:email", isAuthenticated, (req, res) => {
  User.findOne({ email: req.user.email })
    .then(user => {
      if (user) {
        return res.status(404).json({ message: `No user found with email: ${res.params.email}` })
      } else {
        user.email = req.body.email
        user.contact = req.body.contact
        user.name = req.body.name
        user.avatarUrl = req.body.avatarUrl
        return user.save()
      }
    })
    .then(user => res.json({ user }))
    .catch(error => res.status(500).json({ message: error.message }))
})

/**
 * @swagger
 * path:
 *  /users/:email:
 *    delete:
 *      summary: Delete a user
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.delete("/:email", isAuthenticated, (req, res) => {
  User.findOne({ email: req.user.email })
    .then(user => {
      if (user) {
        return res.status(404).json({ message: `No user found with email: ${res.params.email}` })
      } else {
        user.status = "inactive"
        return user.save()
      }
    })
    .then(user => res.json({ user }))
    .catch(error => res.status(500).json({ message: error.message }))
})

module.exports = router