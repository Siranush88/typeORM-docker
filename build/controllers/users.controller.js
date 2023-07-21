var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userRepository } from '../services/users.service.js';
// import { AppDataSource } from '../data-source.js';
// import { UserEntity } from '../users.entity.js';
// AppDataSource.initialize().then(() => { console.log('Connected to DataBase successfully') }).catch((error) => console.log(error))
// const userRepository = AppDataSource.getRepository(UserEntity);
export const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield userRepository.find();
        res.json(allUsers);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Users are not found." });
    }
});
export const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield userRepository.findOneBy({ id: body.id });
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
        const data = userRepository.create({
            name: body.name,
            age: body.age,
            gender: body.gender,
            status: body.status,
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        });
        yield userRepository.save(data);
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
        const user = yield userRepository.findOne({
            where: { id: userId },
        });
        // if (!user) {
        //     return res.status(404).json({ error: "User is not found." });
        // }
        const body = req.body;
        user.name = body.name;
        user.age = body.age;
        user.gender = body.gender;
        user.status = body.status;
        // user.created = new Date().toISOString();
        // user.updated = new Date().toISOString();
        yield userRepository.save(user);
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
        const user = yield userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ error: "User is not found." });
        }
        yield userRepository.delete(user);
        res.json({ message: `The user with ${userId} ID has been deleted successfully.` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the user." });
    }
});
