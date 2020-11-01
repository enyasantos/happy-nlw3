import { Request, Response} from 'express';
import { getRepository } from 'typeorm';

import nodemailer from 'nodemailer';

import Cryptr from 'cryptr';

import Users from '../models/Users';

class UserController {
    async forgotPassword(request: Request, response: Response) {
        const userRepository = getRepository(Users);

        const {
            email,
        } = request.body;

        const user = await userRepository.findOne({ where: {email}});

        if(!user) 
            return response.status(401).json({ message: 'E-mail não cadastrado.'});

        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "138c585e4a6704",
              pass: "85c75e7ea86ba7"
            } 
        });

        const cryptr = new Cryptr('myTotalySecretKey');
        const encryptedUserID = cryptr.encrypt(user.id.toString());
        const encryptedEmail = cryptr.encrypt(user.email);
        const encryptedSecretWord = cryptr.encrypt('happyresetpassword');

        const secret_key = encryptedSecretWord + '-' + encryptedUserID + '-' + encryptedEmail

        transporter.sendMail({
            from: 'Administrador <d535abef16-dfca26@inbox.mailtrap.io>',
            to: email,
            subject: 'Recuperação de Senha - Happy',
            html: `
                <b>Olá, <strong>${user.name}</strong></b>
                <p>
                    Através deste 
                    <a href="http://localhost:3000/dashboard/password-reset/${secret_key}">
                        link 
                    </a>
                    você poderá recuperar sua senha:
                    <a href="http://localhost:3000/dashboard/password-reset/${secret_key}">
                        http://localhost:3000/dashboard/password-reset/${secret_key}
                    </a>
                </p>
            `
        }).then(() => {
            return response.status(200).json({ message: 'Email enviado com sucesso.'});
        }).catch(() => {
            return response.status(400).json({ message: 'Erro ao enviar email.'});
        })
    }

    async changePassword(request: Request, response: Response) {

        const userRepository = getRepository(Users);

        const { key } = request.params;

        const cryptr = new Cryptr('myTotalySecretKey');

        const keyParts = key.split('-');
        const secret_word = keyParts[0];
        const id = keyParts[1]
        const email = keyParts[2]
        console.log(cryptr.decrypt(secret_word))

        if(!('happyresetpassword' === cryptr.decrypt(secret_word)))
            return response.status(401).json({ message: 'Erro ao alterar senha.'});
        
        const user = await userRepository.findOne({ where: {email: cryptr.decrypt(email)}});

        if(!user) 
            return response.status(401).json({ message: 'Erro ao alterar senha, usuário não existe.'});

        if(!(user.id.toString() === cryptr.decrypt(id)))
            return response.status(401).json({ message: 'Erro ao alterar senha, sem permissão para alterar senha.'});

    
        const {
            password,
        } = request.body;

        user.password = password;

        await userRepository.save(user);

        return response.status(200).json({ message: 'Senha alterada com sucesso.'});
    }
}

export default new UserController();