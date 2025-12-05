const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.query;

  if (url) {
    return res.status(400).json({ error: 'Parameter name dan profile wajib diisi.' });
  }

  try {
    const response = await axios.post('https://zymzzstore.my.id', 
      image: url,
      welcome: welcome === 'true'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://zymzzstore.my.id'
      },
      responseType: 'arraybuffer'
    });

    const buffer = Buffer.from(response.data);
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: 'Gagal membuat gambar.' });
  }
});

module.exports = router;
