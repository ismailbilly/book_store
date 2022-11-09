const {Author, Book } = require('../models')
const { v4: uuidv4 } = require('uuid')
const {bookValidation}=require('../validations/book.validation')


const uploadBook =(req,res)=>{
    const {error, value} =bookValidation(req.body)
        if (error != undefined) {
            // res.status(400).json({
            //     status: false,
            //     message: error.details[0].message
           
            // })
            console.log(error)
        }
    const {firstName,lastName,middleName,email,title,pages,price,status,isbn,published_date,rating} =req.body
        const author_id = uuidv4()
        const book_id = uuidv4()
    try {
        
            Author.create({
                author_id: author_id,
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                email: email
            })
            .then(resolve=>{
                Book.create({
                    book_id: book_id,
                    author_id: author_id,
                    title: title,
                    pages: pages,
                    price: price,
                    status: status,
                    isbn: isbn,
                    published_date: published_date,
                    rating: rating
                })
            })
            .then((resolve)=>{
                console.log('Book upload successful')
            }).catch((error)=>{
                res.status(400).json({
                    status: false,
                    message: error.message || "Some error occurred"
                })
            })
                
                 
        
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message || "Some error occurred"
        })
        
    }
}


module.exports = {uploadBook}