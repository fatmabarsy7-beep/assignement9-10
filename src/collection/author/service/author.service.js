
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authorRepository from "../repository/author.repository.js";
import { sendEmail } from "../../../lib/db/email/nodemailer.js";

const JWT_SECRET = "mySuperSecretKey123";


// REGISTER
export async function register(data) {

    const { name, email, password, country } = data;

    const existingAuthor =
        await authorRepository.findAuthorByEmail(email);

    if (existingAuthor) {
        throw new Error("Author already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const author = await authorRepository.createAuthor({
        name,
        email,
        password: hashedPassword,
        country
    });

      await sendEmail(

        email,
        "Welcome to Library",
        
           '<h2>Welcome ${name}!</h2> <p>Your registration was successful.</p>' 
           
        
);

    return {
        id: author._id,
        name: author.name,
        email: author.email,
        country: author.country
    };
}



export async function login(data) {

    const { email, password } = data;


    const author =
        await authorRepository.findAuthorByEmail(email);

    if (!author) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect =
        await bcrypt.compare(password, author.password);

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            userId: author._id
        },
        JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        token
    };
}

 export async function createAuthor(authorData) {
  return await authorRepository.createAuthor(authorData)
}


export async function getAllAuthor() {
    return await authorRepository.getAllAuthor()
}