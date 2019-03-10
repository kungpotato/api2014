var bookController = function(Book){
    var post = (req, res)=>{
        var book = new Book(req.body)

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        else {
            book.save();
            res.status(201)
            res.send(book);
        }
    }
    
    var get = (req,res)=>{
        // var responseJson = {hello: "This is my api"}
        // res.json(responseJson)

        var query = {};

        if(req.query.genre)
        // ถ้ามีค่าให้แสดง
        {
            query.genre = req.query.genre;
        }

        Book.find(query, function(err,books){
            if(err)
                res.status(500).send(err);
            else{
                var returnBooks = [];
                books.forEach(function(element, index, array){
                    var newBook = element.toJSON();
                    newBook.links= {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id
                    returnBooks.push(newBook);
                });
                res.json(returnBooks);
            }
        });
    }
    return {
        post: post,
        get:get
    }
}

module.exports = bookController;