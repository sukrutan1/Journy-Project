import { checkIfUserExists, createUser, getUserByEmail, getUserById } from "../db/queries/queries.js";
import { type NewUser, type User } from "../db/schema";
import { generateJWTToken, type TokenPayload } from "../utils/jwt.js";
import { checkPasswordHash, hashPassword } from "../utils/security.js";


export async function handlerRegister(email: string, password: string, fullName: string) {
    // checkIfUserExists(email) -> true = user exists, false = user not exists
    const userExists = await checkIfUserExists(email);

    if (userExists) {
        throw new Error("Email already in use");
    }

    const hashedPassword = await hashPassword(password);
    const newUser: NewUser = {
        email: email,
        password: hashedPassword,
        fullName: fullName,
    };

    const user = await createUser(newUser);

    if (!user) {
        throw new Error("User creation failed");
    }
    
    const userWithoutPassword: Omit<User,"password"> = {
        email: user.email,
        fullName: user.fullName,
        id: user.id,
        createdAt: user.createdAt,
    };

    return userWithoutPassword;
}


export async function handlerLogin(email: string, password: string) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const passwordCheck = await checkPasswordHash(password, user.password);

    if (!passwordCheck) {
        throw new Error("Password didnt match");
    }
    const payload: TokenPayload = {
        userId: user.id,
    };

    const userToken = generateJWTToken(payload);

    return userToken;
}


export async function getUserProfile(userId: string) {
    const user = await getUserById(userId);

    if (!user) {
        throw new Error("User cannot found");
    }

    const userWithoutPassword: Omit<User,"password"> = {
        email: user.email,
        fullName: user.fullName,
        id: user.id,
        createdAt: user.createdAt,
    };

    return userWithoutPassword;
}
