const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getSubjects,
  getSubject,
  createSubject,
  deleteSubject,
  updateSubject,
  uploadSubjectPhoto,
  uploadSubjectVideo,
} = require("../controller/subjects");

const router = express.Router();

//"/api/v1/subjects"
router
  .route("/")
  .get(getSubjects)
  .post(protect, authorize("admin", "operator"), createSubject);
router
  .route("/:id")
  .get(getSubject)
  .delete(protect, authorize("admin"), deleteSubject)
  .put(protect, authorize("admin", "operator"), updateSubject);
router.route("/:id/photo").put(uploadSubjectPhoto);
router.route("/:id/video").put(uploadSubjectVideo);

module.exports = router;
