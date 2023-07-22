import { AppDataSource } from '../data-source.js';
import { UserEntity } from '../users.entity.js';
AppDataSource.initialize().then(() => { console.log('Connected to DataBase successfully'); }).catch((error) => console.log(error));
export const userRepository = AppDataSource.getRepository(UserEntity);
export const allUsers = () => {
    return userRepository.find();
};
export const user = (userId) => {
    return userRepository.findOne({
        where: { id: userId },
    });
};
export const saveUser = (data) => {
    return userRepository.save(data);
};
export const createUser = (data) => {
    return userRepository.create({
        name: data.name,
        age: data.age,
        gender: data.gender,
        status: data.status,
    });
};
export const updateUser = (user, data) => {
    user.name = data.name;
    user.age = data.age;
    user.gender = data.gender;
    user.status = data.status;
    return user;
};
export const removeUser = (data) => {
    return userRepository.remove(data);
};
