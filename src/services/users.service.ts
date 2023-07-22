import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source.js';
import { UserEntity } from '../users.entity.js';
import { IRequestBody } from '../controllers/types/interfaces.js';

AppDataSource.initialize().then(() => { console.log('Connected to DataBase successfully') }).catch((error) => console.log(error))

export const userRepository:Repository<UserEntity> = AppDataSource.getRepository(UserEntity);

export const allUsers = () => {
    return userRepository.find();
} 

export const user = (userId: number) => {
    return userRepository.findOne({
        where: { id: userId },
    });
}


export const saveUser = (data: any) => {
    return userRepository.save(data);
}

export const createUser = (data:UserEntity):UserEntity => {
   return userRepository.create({
        name: data.name,
        age: data.age, 
        gender: data.gender, 
        status: data.status, 
    }); 
}

export const updateUser = (user: UserEntity, data: IRequestBody) => {
    user.name = data.name;
    user.age = data.age;
    user.gender = data.gender;
    user.status = data.status;

    return user;
}

export const removeUser = (data: UserEntity) => {
    return userRepository.remove(data);
}


