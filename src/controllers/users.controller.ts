import { Request, Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { UserEntity } from '../users.entity.js';

AppDataSource.initialize().then(() => { console.log('Connected to DataBase successfully') }).catch((error) => console.log(error))

const userRepository = AppDataSource.getRepository(UserEntity);

export const getAllUsersController = async (req:Request, res:Response) => {
    try {
        const allUsers = await userRepository.find();
        res.json(allUsers);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Users are not found." });
    }
};
  
  export const getUserController =  async (req:Request, res:Response) => {
    try {
        const body = req.body;
        const data = await userRepository.findOneBy({id: body.id});
        res.send(data)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "User is not found." });
    }
};
  
  export const createNewUserController = async (req:Request, res:Response) => {
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
         await userRepository.save(data);
         res.send(`${body.name} created successfully`)
 
     } catch (err) {
         console.error(err);
         res.status(500).json({ error: "Failed to create the user." });
     }
 };
  
export const updateUserController = async (req: Request,res: Response): Promise<void> => {
   try {
    const userId: number = parseInt(req.params.id);
    const user: UserEntity | any = await userRepository.findOne({
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
    user.created = new Date().toISOString();
    user.updated = new Date().toISOString();

    await userRepository.save(user);
    res.json({ message: `${userId} user has been updated successfully.` });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "An error occurred while updating the user." });
}
  };
  
  export const deleteUserController = async (req:Request, res:Response) => {
    try {
        const userId: number = parseInt(req.params.id);

        const user: UserEntity | null = await userRepository.findOne({
            where: { id: userId },
        });
 
        if (!user) {
            return res.status(404).json({ error: "User is not found." });
        }
        await userRepository.delete(user);

        res.json({ message: `The user with ${userId} ID has been deleted successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the user." });
    }
};