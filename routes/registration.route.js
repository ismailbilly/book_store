const express = require('express')
const {uploadBook} = require('../controllers/bookUpload.controller')
const router = express.Router()

// router.get('/all-books', getAllBooks)
// router.get('/:title', findOneBook)
// router.get('/:firstname/:lastname', findBooksByAuthor)

router.post('/upload', uploadBook)

// router.put('/update', updateBook)

// router.delete('/delete', deleteBook)



module.exports = router