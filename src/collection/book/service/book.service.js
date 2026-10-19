import * as bookRepository from "../repository/book.repository.js";

export async function createBook(bookData) {
   return await bookRepository.createBook(bookData);
}


export async function createBooks(bookData) {
     return await bookRepository.createBooks(bookData)

     if(!bookData) throw new error('this book not exist')
}

const cache = new Map();

export async function getBookByTitle(title) {
    const key = title.trim().toLowerCase();

    if (cache.has(key)) {
        return {
            book: cache.get(key),
            cacheStatus: "HIT"
        };
    }

    const book = await bookRepository.getBookByTitle(title);

    if (book) {
        cache.set(key, book);
    }

    return {
        book,
        cacheStatus: "MISS"
    };
}
export async function getAllBooks() {

    return await bookRepository.getAllBooks()
}

export async function updateBookByTitle(title, year) {

  return await bookRepository.updateBookByTitle(title, year);
}



const yearsCache = new Map();

export async function getBooksBetweenYears(from, to) {
    const key = `${from}-${to}`;

    if (yearsCache.has(key)) {
        console.log("YEARS CACHE HIT");
        return yearsCache.get(key);
    }

    console.log("YEARS CACHE MISS");

    const books =
        await bookRepository.getBooksBetweenYears(from, to);

    yearsCache.set(key, books);

    return books;
}


const genreCache = new Map();

export async function getBooksByGenre(genre) {
    const key = genre.trim().toLowerCase();

    if (genreCache.has(key)) {
        console.log("GENRE CACHE HIT");
        return genreCache.get(key);
    }

    console.log("GENRE CACHE MISS");

    const books = await bookRepository.getBooksByGenre(genre);

    genreCache.set(key, books);

    return books;
}

let skipLimitCache = null;

export async function getBooksSkipLimit() {
    if (skipLimitCache !== null) {
        console.log("SKIP LIMIT CACHE HIT");
        return skipLimitCache;
    }

    console.log("SKIP LIMIT CACHE MISS");

    skipLimitCache = await bookRepository.getBooksSkipLimit();

    return skipLimitCache;
}

export async function getBooksWithIntegerYear() {
  return await bookRepository.getBooksWithIntegerYear();
}

export async function getBooksExcludeGenres() {
  return await bookRepository.getBooksExcludeGenres();
}

export async function deleteBooksBeforeYear(year) {
  return await bookRepository.deleteBooksBeforeYear(year);
}

export async function aggregateBooks1() {
  return await bookRepository.aggregateBooks1();
}

export async function aggregateBooks2() {
  return await bookRepository.aggregateBooks2();
}

export async function aggregateBooks3() {
  return await bookRepository.aggregateBooks3();
}
