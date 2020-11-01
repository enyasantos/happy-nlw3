import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from '../models/Users';

class AuthController {
    async authenticate(request: Request, response: Response) {

        const userRepository = getRepository(Users);

        const {
            email,
            password
        } = request.body;

        const user = await userRepository.findOne({ where: {email}});

        if(!user) 
            return response.status(401).json({ message: 'E-mail não cadastrado.'});

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword)
            return response.status(401).json({ message: 'Senha está incorreta.'});

        const token = jwt.sign({ id: user.id }, `${process.env.SECRET_KEY}`, {expiresIn: '1d'});
        
        return response.status(201).json({user, token});
    }
}

export default new AuthController();