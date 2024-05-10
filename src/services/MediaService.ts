import AppDataSource from "../data-source";
import { Media } from "../entities/Media";

class MediaService {
    private mediaRepository = AppDataSource.getRepository(Media);

    // ok - GET ALL
    async getAll() {
        console.log("MediaService - get all");
        const medias = await this.mediaRepository.find();
        if (medias.length === 0) {
            throw new Error('No medias found');
        }
        return medias;
    }

    // ok - GET BY ID
    async getMediaById(id: number) {
        console.log("MediaService - Get by id");
        const media = await this.mediaRepository.findOneBy({ id: id });
        if (!media) {
            throw new Error('Media not found');
        } else {
            return media;
        }
    }

    // OK CREATE MEDIA
    async create(media: Media) {
        console.log("MediaService - create");
        const existingMedia = await this.mediaRepository.findOneBy({ title: media.title });
        if (existingMedia) {
            throw new Error('Media already exists');
        }
        const newMedia = this.mediaRepository.create(media);
        console.log("newMedia", newMedia);
        return this.mediaRepository.save(newMedia);
    }

    // ok - UPDATE MEDIA
    async updateMedia(id: number, media: Media) {
        console.log("MediaService - Update");
        const foundMedia = await this.mediaRepository.findOneBy({ id: id });

        if (foundMedia) {
            return this.mediaRepository.update(id, media);
        } else {
            throw new Error(`Media doesn't exist`);
        }
    }


    // ok - DELETE Media
    async deleteMedia(id: number) {
        const media = await this.mediaRepository.findOneBy({ id: id });
        console.log("MediaService - Delete");
        if (!media) {
            throw new Error('Media not found');
        } else {
            return this.mediaRepository.delete(id);
        }
    }
}

export default MediaService;