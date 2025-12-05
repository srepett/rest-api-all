const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

// Folder upload
const uploadDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

// Setup multer: simpan file ke folder uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, unique + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

// POST saja
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: 'Masukkan file pada form-data: file'
      })
    }

    const file = req.file

    // Hitung size MB
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2)

    // URL file agar bisa diakses publik
    const url = `https://zymzzstore.my.id/uploads/${file.filename}`

    return res.json({
      status: true,
      message: 'Upload berhasil',
      data: {
        name: file.filename,
        originalname: file.originalname,
        sizeMB,
        url
      }
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: false,
      message: 'Gagal upload file'
    })
  }
})

module.exports = router
