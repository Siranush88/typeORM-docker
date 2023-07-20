var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source.js';
import { UserEntity } from './users.entity.js';
const app = express();
app.use(express.json());
AppDataSource.initialize().then(() => { console.log('Connected to DB successfully'); }).catch((error) => console.log(error));
const userRepository = AppDataSource.getRepository(UserEntity);
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield userRepository.find();
        res.json(allUsers);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Users are not found." });
    }
}));
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield userRepository.findBy({ id: body.id });
        res.send(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "The user is not found." });
    }
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = userRepository.create({
            name: body.name,
            age: body.age,
            gender: body.gender,
            status: body.status,
            created: body.created,
            updated: body.updated
        });
        yield userRepository.save(data);
        res.send(`${body.name} created successfully`);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "The user doesn't beeing created." });
    }
}));
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = yield userRepository.findOne({
            where: { id: userId },
        });
        // const userId = req.params.id;
        // const user = await userRepository.findOne(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        yield userRepository.delete(user);
        res.json({ message: `${userId} user has been deleted successfully.` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "The user doesn't beeing removed." });
    }
}));
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT} ...`);
});
