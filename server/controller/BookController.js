import Book from "../mongodb/models/book.js";

export const createBook  = async (req, res, next) => {
    
    const newBook = new Book(req.body);

     try {
        
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);   

     }

     catch (error) {
        res.status(500).json(error);


     }


}


export const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
        return next();
    } catch (error) {
        next(error);
    }
}


export const updateBook = async (req, res, next) => {
    
    try {
       
      const updateBook = await Book.findByIdAndUpdate
      (req.params.id, { $set: req.body }, { new: true });


       res.status(200).json(updateBook);   

    }

    catch (error) {
       res.status(500).json(error);
    }

}

export const deleteBook = async (req, res, next) => {
    
   try {
      
    await Book.findByIdAndDelete(req.params.id, 
     { $set: req.body },
      { new: true }); 

     res.status(200).json("Book has been deleted");

  }

  catch (error) {
     res.status(500).json(error);
  }

}

export const getBook = async (req, res, next) => {

    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
        return next();
    } catch (error) {
        next(error);
    }
}   

