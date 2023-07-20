import 'reflect-metadata';
import express, {Request, Response} from 'express';
import { AppDataSource } from './data-source.js';
import { UserEntity } from './users.entity.js';


const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => { console.log('Connected to DataBase successfully') }).catch((error) => console.log(error))

const userRepository = AppDataSource.getRepository(UserEntity);

app.get('/users', async (req:Request, res:Response) => {
    try {
        const allUsers = await userRepository.find();
        res.json(allUsers);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Users are not found." });
    }
})

app.get('/users/:id', async (req:Request, res:Response) => {
    try {
    const body = req.body;
    const data = await userRepository.findBy({id: body.id});
    res.send(data)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "The user is not found." });
    }
})

app.post('/users', async (req:Request, res:Response) => {
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
        await userRepository.save(data);
        res.send(`${body.name} created successfully`)

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "The user doesn't beeing created." });
    }
})

app.delete('/users/:id', async (req:Request, res:Response) => {
    try {
        const userId: number = parseInt(req.params.id, 10);

        const user: UserEntity | null = await userRepository.findOne({
            where: { id: userId },
        });
 
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        await userRepository.delete(user);

        res.json({ message: `The user with ${userId} id has been deleted successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove." });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT} ...`);
});
