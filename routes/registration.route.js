const express = require('express')
const { uploadBook, getAllBooks, findOneBook, findBooksByAuthor, deleteBook, updateBook } = require('../controllers/bookUpload.controller')
const router = express.Router()

router.get('/all-books', getAllBooks)
router.get('/:title', findOneBook)
router.get('/author/:firstname/:lastname', findBooksByAuthor)

router.post('/upload', uploadBook)

router.put('/update', updateBook)

router.delete('/delete/:title', deleteBook)



module.exports = router