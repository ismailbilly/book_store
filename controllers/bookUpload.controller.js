const { Author, Book } = require('../models')
const { v4: uuidv4 } = require('uuid')
const { bookValidation } = require('../validations/book.validation')
const { Op } = require("sequelize");
// const { UPSERT } = require('sequelize/types/query-types');

const getAllBooks = (req, res) => {
    try {
        Book.findAll({
            attributes: ['title', 'pages', 'price', 'isbn', 'status', 'rating'] 
        })
        .then((booksdata) => {
            if (booksdata.length == 0) throw new Error('No book found, DB is empty')
            res.status(200).send({
                status: true,
                message: booksdata
            })
        })
        .catch((err)=>{
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

const findOneBook = (req, res) => {
    const { title } = req.params
    try {
        Book.findAll({
            where: {
                 title: {
                  [Op.like]: `%${title}%`
                }
            },
            attributes: ['title', 'pages', 'price', 'isbn', 'status', 'rating'] 
        })
        .then((bookdata) => {
            if (bookdata.length == 0) throw new Error(`No book with the title: ${title}`)
            res.status(200).send({
                status: true,
                message: bookdata
            })
        })
        .catch((err) => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

const findBooksByAuthor = (req, res) => {
    const { firstname, lastname } = req.params
    try {
        Author.findAll({
            where: {
                firstName: firstname,
                lastName: lastname
            },
            attributes: ['author_id']
        })
        .then((authorinfo) => {
            if (authorinfo.length == 0) throw new Error(`Author: ${firstname} ${lastname} does not exist`)
            return Book.findAll({
                where: {
                    author_id: authorinfo[0].author_id
                },
                attributes: ['title', 'pages', 'price', 'isbn', 'status', 'rating']
            })
        })
        .then((bookdata) => {
            if (bookdata.length == 0) throw new Error(`No book from Author: ${firstname} ${lastname}`)
            res.status(200).send({
                status: true,
                message: bookdata
            })
        })
        .catch((err) => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

const uploadBook =(req, res) => {
    const { error, value } = bookValidation(req.body)
    
    if (error != undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    }else{

        const { 
            firstName, lastName, middleName, email, title, pages, 
            price, status, isbn, published_date, rating 
        } = req.body

        const book_id = uuidv4()
        let author_id

        try {
            Book.findAll({   //check if book exist
                where:{
                    title: title,
                    pages: pages,
                    isbn: isbn
                },
                attributes:['title', 'isbn'] 
            })
            .then((data)=>{
                if(data.length > 0) throw new Error(`Book already exists`) //if book is found throw error
                
                return Author.findAll({ //if book not found, check if author already exists
                    where:{
                        firstName:firstName,
                        lastName:lastName,
                        email:email
                    },
                    attributes:['author_id'] 
                })
            })
            .then( authordata => { 
                if(authordata.length >= 1) { //if author exists, get author id to create book
                    author_id = authordata[0].author_id
                    return;
                } else { //if author does not exist, create author
                    author_id = uuidv4()
                    return Author.create({
                        author_id: author_id,
                        firstName: firstName,
                        lastName: lastName,
                        middleName: middleName,
                        email: email
                    })
                }
            })
            .then((resolve) => { //if author exists or not create book except book exist already
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
            .then((resolve) => {
                res.status(200).send({
                    status: true,
                    message: `Book titled: '${title}' uploaded successful`
                })
            }).catch((err)=>{
                res.status(400).json({
                    status: false,
                    message: err.message
                })
            })
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.message || "Some error occurred"
            })
        }
    }
}

const deleteBook=((req,res)=>{
    const {title}= req.params
   try {
            Book.destroy({
                where:{
                    title:title
                }
            }) .then((resolve)=>{
                res.send('Book deleted successful')
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
})

const updateBook = async (req, res) => {
    const { error, value } = updateValidation(req.body)

    if (error != undefined) {
        throw new Error(error.details[0].message)
    } else {
        const { book_id } = req.params
        const { title, pages, price, status, isbn, rating } = req.body
        
        try {
            await Book.update({
                title: title,
                pages: pages,
                price: price,
                status: status,
                isbn: isbn,
                rating: rating
            },
            { where: { book_id: book_id } })

            res.status(200).send({
                status: true,
                message: 'book details updated successfully'
            })

        } catch (err) {
            res.status(400).json({
                status: false,
                message: err.message || "Some error occurred"
            })
        }
    }
}

module.exports = { 
    uploadBook, getAllBooks, findOneBook,
    findBooksByAuthor, deleteBook, updateBook 
}