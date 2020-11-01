import fs from 'fs';
import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });
        return response.status(200).json(orphanageView.renderMany(orphanages));
    },
    
    async show(request: Request, response: Response) {
        const { id } = request.params;
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return response.status(200).json(orphanageView.render(orphanage));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude, 
            longitude,
            about, 
            instructions, 
            whatsapp_number,
            opening_hours,
            open_on_weekends,
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename}
        });
    
        const data = {
            name,
            latitude, 
            longitude,
            about, 
            instructions, 
            whatsapp_number,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            status: 'pending',
            images,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            whatsapp_number: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            status: Yup.string().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,

        });

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const [orphanage] = await orphanagesRepository.find({
            where: {id},
            relations: ['images']
        });

        orphanage.images.map(image => {
            const filename = image.path;
            const path = `${__dirname}/../../uploads/${filename}`;
            fs.unlink(path, (err) => {
                if(err)
                    return response.status(400).json({ message: 'Erro ao apagar imagens do orfanato.'});
            })
        })

        await orphanagesRepository.delete(id);

        return response.status(200).json({ message: 'Deletado com sucesso.'});
    },

    async update(request: Request, response: Response) {
        const {
            name,
            latitude, 
            longitude,
            about, 
            instructions, 
            whatsapp_number,
            opening_hours,
            open_on_weekends,
            status,
        } = request.body;

        const idOrphanage = request.params.id;

        const orphanagesRepository = getRepository(Orphanage);

        let currentOrphanage = await orphanagesRepository.findOne({ 
            where: {id: idOrphanage},
            relations: ['images']
        });

        if(!currentOrphanage)
            return response.status(404).json({ message: 'Orfanato não encontrado '});

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename}
        });

        if(images) {
            console.log(images);
        }
    
        currentOrphanage.name = name;
        currentOrphanage.latitude = latitude;
        currentOrphanage.longitude = longitude;
        currentOrphanage.about = about;
        currentOrphanage.instructions = instructions;
        currentOrphanage.whatsapp_number = whatsapp_number;
        currentOrphanage.opening_hours = opening_hours;
        currentOrphanage.open_on_weekends = open_on_weekends === 'true';
        currentOrphanage.status = status;

        await orphanagesRepository.save(currentOrphanage);
    

        return response.status(200).json({ message: 'Atualizado com sucesso.'});
    
    }
}