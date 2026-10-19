import * as bookService from "../service/book.service.js";

// 5
export async function createBook(req, res, next) {
  try {
    const book = await bookService.createBook(req.body);

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}

// 6
export async function createBooks(req, res, next) {
  try {
    const books = await bookService.createBooks(req.body);

    res.status(201).json(books);
  } catch (error) {
    next(error);
  }
}

// 8
export async function updateBook(req, res, next) {
  try {
    const result = await bookService.updateBookByTitle(
      req.params.title,
      2022
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
}

// 9
export const getBookByTitle = async (req, res, next) => {
    try {
        const { book, cacheStatus } =
            await bookService.getBookByTitle(req.query.title);

        res.status(200).json({
            success: true,
            cache: cacheStatus,
            data: book
        });
    } catch (error) {
        next(error);
    }
};

// 10
export async function getBooksBetweenYears(req, res, next) {
  try {
    const books = await bookService.getBooksBetweenYears(
      req.query.from,
      req.query.to
    );

    res.json(books);
  } catch (error) {
    next(error);
  }
}

// 11
export async function getBooksByGenre(req, res, next) {
  try {
    const books = await bookService.getBooksByGenre(
      req.query.genre
    );

    res.json(books);
  } catch (error) {
    next(error);
  }
}

// 12
export async function getBooksSkipLimit(req, res, next) {
  try {
    const books = await bookService.getBooksSkipLimit();

    res.json(books);
  } catch (error) {
    next(error);
  }
}

// 13
export async function getBooksWithIntegerYear(req, res, next) {
  try {
    const books = await bookService.getBooksWithIntegerYear();

    res.json(books);
  } catch (error) {
    next(error);
  }
}

// 14
export async function getBooksExcludeGenres(req, res, next) {
  try {
    const books = await bookService.getBooksExcludeGenres();

    res.json(books);
  } catch (error) {
    next(error);
  }
}

// 15
export async function deleteBooksBeforeYear(req, res, next) {
  try {
    const result = await bookService.deleteBooksBeforeYear(
      req.query.year
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
}

// 16
export async function aggregateBooks1(req, res, next) {
  try {
    const books = await bookService.aggregateBooks1();

    res.json(books);
  } catch (error) {
    next(error);
  }
}

// 17
export async function aggregateBooks2(req, res, next) {
  try {
    const books = await bookService.aggregateBooks2();

    res.json(books);
  } catch (error) {
    next(error);
  }
}

// 18
export async function aggregateBooks3(req, res, next) {
  try {
    const books = await bookService.aggregateBooks3();

    res.json(books);
  } catch (error) {
    next(error);
  }
}