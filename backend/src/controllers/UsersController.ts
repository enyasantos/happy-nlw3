import { Request, Response} from 'express';
import { getRepository } from 'typeorm';

import Users from '../models/Users';

class UserController {
    async index(request: Request, response: Response) {
        const userRepository = getRepository(Users);

        const users = await userRepository.find();

        return response.status(200).json(users);
    }

    async create(request: Request, response: Response) {

        const userRepository = getRepository(Users);

        const {
            name,
            email,
            password,
        } = request.body;

        const userExists = await userRepository.findOne({ where: {email}});
            if(userExists) return response.status(409).json({ message: 'O email já está em uso.'}); //409 - conflito

        const data = {
            name,
            email,
            password,
        }

        const user =  userRepository.create(data);

        await  userRepository.save(user);

        return response.status(201).json(user);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const userRepository = getRepository(Users);

        await userRepository.delete(id);

        return response.status(200).json({ message: 'Deletado com sucesso.'});
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const userRepository = getRepository(Users);

        const user = await userRepository.findOne({ where: {id}});

        if(!user)
            return response.status(404).json({ message: 'Usuário não encontrado '});

        const {
            name,
            email,
            password,
        } = request.body;

        user.name = name;
        user.email = email;
        user.password = password;

        await userRepository.save(user);

        return response.status(200).json({ message: 'Atualizado com sucesso.'});
    }
}

export default new UserController();