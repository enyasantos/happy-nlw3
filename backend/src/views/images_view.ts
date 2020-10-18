import Image from '../models/Images';

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `${process.env.URL_BASE}/uploads/${image.path}`
        }
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image));
    }
};