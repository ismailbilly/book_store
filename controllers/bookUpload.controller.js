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
            //if (booksdata.length == 0) throw new Error('No book found, DB is empty') //rosh to help with error 
            if (booksdata.length == 0) booksdata = 'No book found, DB is empty'
            res.status(200).send({
                status: true,
                message: booksdata
            })
        })
        .catch((err)=>{
            throw new Error(err.message)
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
            if (bookdata.length == 0) bookdata = `No book with the title: ${title}`
            res.status(200).send({
                status: true,
                message: bookdata
            })
        })
        .catch((err) => {
            throw new Error(err.message)
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
            if (authorinfo.length == 0) throw new error(`Author: ${firstname} ${lastname} does not exist`)
            return Book.findAll({
                where: {
                    author_id: authorinfo[0].author_id
                },
                attributes: ['title', 'pages', 'price', 'isbn', 'status', 'rating']
            })
        })
        .then((bookdata) => {
            console.log('Author:'+ bookdata)
            if (bookdata.length == 0) bookdata = `No book from Author: ${firstname} ${lastname}`
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

const uploadBook =(req,res)=>{
    const {error, value} =bookValidation(req.body)
        if (error != undefined) {
            
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    }else{
    const {firstName,lastName,middleName,email,title,pages,price,status,isbn,published_date,rating} =req.body
        const author_id = uuidv4()
        const book_id = uuidv4()
    try {
        Book.findAll({
            where:{
                title:title
            },
            attributes:['title', 'pages', 'price', 'isbn', 'status', 'rating'] 
        })
        .then((data)=>{
            if(data.length > 0) throw new Error('Book exists')
             Author.create({
                author_id: author_id,
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                email: email
             })
        })
            .then((resolve)=>{
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
                res.send('Book upload successful')
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
module.exports = {uploadBook, getAllBooks, findOneBook, findBooksByAuthor, deleteBook}