import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';

export default {
    async show(request: Request, response: Response) {
        const { status } = request.query;

        console.log(status)

        const orphanagesRepository = getRepository(Orphanage);

        if(!status)
            return response.status(400).json({ message: 'Query param não encontrado.'})

        const orphanage = await orphanagesRepository.find({
            relations: ['images'],
            where: {status: status.toString()}
        });

        if(orphanage.length === 0)
            return response.status(400).json({ message: 'Nenhum orfanato encontrado.'})

        return response.status(200).json(orphanage);
    },
}