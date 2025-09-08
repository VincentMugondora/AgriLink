const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '')
      .slice(0, 40);
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Only image files (jpg, png, webp, gif) are allowed'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 5 }, // 5MB max, up to 5 files
  fileFilter,
});

// Upload images endpoint
router.post(
  '/images',
  protect,
  authorize('farmer', 'trader', 'admin'),
  upload.array('images', 5),
  (req, res) => {
    try {
      const files = req.files || [];
      if (!files.length) {
        return res.status(400).json({ message: 'No files uploaded' });
      }

      // Serve via /api/uploads so frontend proxy works in dev
      const urls = files.map((f) => `/api/uploads/${f.filename}`);
      res.json({ urls });
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ message: 'File upload failed' });
    }
  }
);

module.exports = router;
