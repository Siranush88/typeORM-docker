var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { allUsers, user, saveUser, removeUser, createUser, updateUser } from '../services/users.service.js';
const KEY = 'a11';
export const apiKeyValidator = (req, res, next) => {
    const apiKey = req.get('api-key');
    if (!apiKey || apiKey !== KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
export const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield allUsers();
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Users are not found." });
    }
});
export const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const data = yield user(userId);
        res.send(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "User is not found." });
    }
});
export const createNewUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = createUser(body);
        yield saveUser(data);
        res.send(`${body.name} created successfully`);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create the user." });
    }
});
export const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const data = yield user(userId);
        const body = req.body;
        const userToUpdate = updateUser(data, body);
        yield saveUser(userToUpdate);
        res.json({ message: `${userId} user has been updated successfully.` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the user." });
    }
});
export const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const userToRemove = yield user(userId);
        if (!user) {
            return res.status(404).json({ error: "User is not found." });
        }
        yield removeUser(userToRemove);
        res.json({ message: `The user with ${userId}ID has been deleted successfully.` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the user." });
    }
});
