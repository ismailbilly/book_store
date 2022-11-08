const express = require(express)

const router = express.Router()

router.get('/all-books', getAllBooks)
router.get('/:title', findOneBook)
router.get('/:firstname/:lastname', findBooksByAuthor)

router.post('/upload-book', insertBook)

router.put('/update', updateBook)

router.delete('/delete', deleteBook)



module.exports={router}