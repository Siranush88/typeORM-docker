import { NextFunction, Request, Response } from 'express';
import { allUsers, user, saveUser, removeUser, createUser, updateUser } from '../services/users.service.js';
import { UserEntity } from '../users.entity.js';
import { IRequestBody } from './types/interfaces.js';


const KEY = 'a11';

export const apiKeyValidator = (req:Request, res:Response, next:NextFunction):void | Response => {
    const apiKey:string | undefined = req.get('api-key');
    if (!apiKey || apiKey !== KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

export const getAllUsersController = async (req:Request, res:Response) => {
    try {
        const data:UserEntity[] = await allUsers()
        res.json(data);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Users are not found." });
    }
};
  
export const getUserController =  async (req:Request, res:Response) => {
    try {
        const userId: number = parseInt(req.params.id);     
        const data:UserEntity | null= await user(userId)
        res.send(data)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "User is not found." });
    }
};
  
export const createNewUserController = async (req:Request, res:Response) => {
    try {
         const body:IRequestBody = req.body;
         const data:UserEntity = createUser(body)  
         await saveUser(data);
         res.send(`${body.name} created successfully`)
 
     } catch (err) {
         console.error(err);
         res.status(500).json({ error: "Failed to create the user." });
     }
 };
  
export const updateUserController = async (req: Request,res: Response): Promise<void> => {
   try {
    const userId: number = parseInt(req.params.id);
    const data: UserEntity | any = await user(userId)
    const body:IRequestBody = req.body;
    const userToUpdate:UserEntity = updateUser(data, body);
    await saveUser(userToUpdate);
    res.json({ message: `${userId} user has been updated successfully.` });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the user." });
}
  };
  
export const deleteUserController = async (req:Request, res:Response) => {
    try {
        const userId: number = parseInt(req.params.id);
        const userToRemove:UserEntity | any = await user(userId)
 
        if (!user) {
            return res.status(404).json({ error: "User is not found." });
        }

        await removeUser(userToRemove)
        res.json({ message: `The user with ${userId}ID has been deleted successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the user." });
    }
};