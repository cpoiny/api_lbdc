import AppDataSource from "../data-source";
import { Media } from "../entities/Media";

class MediaService {

    private mediaRepository = AppDataSource.getRepository(Media);

    /**
     * Retrieves all medias from the media repository.
     * @returns {Promise<Media[]>} A promise that resolves to an array of medias.
     * @throws {Error} If no medias are found.
     */
    async getAll() {
        console.log("MediaService - get all");
        const medias = await this.mediaRepository.find();
        if (medias.length === 0) {
            throw new Error('No medias found');
        }
        return medias;
    };

    /**
     * Retrieves a media by its ID.
     * @param id - The ID of the media to retrieve.
     * @returns The media object if found, otherwise throws an error.
     */
    async getMediaById(id: number) {
        console.log("MediaService - Get by id");
        const media = await this.mediaRepository.findOneBy({ id: id });
        if (!media) {
            throw new Error('Media not found');
        } else {
            return media;
        }
    };

    /**
     * Creates a new media.
     * @param media - The media object to create.
     * @returns A promise that resolves to the created media.
     * @throws Error if the media already exists.
     */
    async create(media: Media) {
        console.log("MediaService - create");
        const existingMedia = await this.mediaRepository.findOneBy({ title: media.title });
        if (existingMedia) {
            throw new Error('Media already exists');
        }
        const newMedia = this.mediaRepository.create(media);
        console.log("newMedia", newMedia);
        return this.mediaRepository.save(newMedia);
    };

    /**
     * Updates a media with the specified ID.
     * @param id - The ID of the media to update.
     * @param media - The updated media object.
     * @returns A promise that resolves to the updated media.
     * @throws Error if the media with the specified ID doesn't exist.
     */
    async updateMedia(id: number, media: Media) {
        console.log("MediaService - Update");
        const foundMedia = await this.mediaRepository.findOneBy({ id: id });

        if (foundMedia) {
            return this.mediaRepository.update(id, media);
        } else {
            throw new Error(`Media doesn't exist`);
        }
    };

    /**
     * Deletes a media by its ID.
     * @param id - The ID of the media to delete.
     * @returns A Promise that resolves to the deleted media.
     * @throws Error if the media is not found.
     */
    async deleteMedia(id: number) {
        const media = await this.mediaRepository.findOneBy({ id: id });
        console.log("MediaService - Delete");
        if (!media) {
            throw new Error('Media not found');
        } else {
            return this.mediaRepository.delete(id);
        }
    };
}

export default MediaService;