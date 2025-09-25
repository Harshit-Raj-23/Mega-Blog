import { Client, Storage, ID } from "appwrite";
import config from "../config/config.js";

class FileService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
            this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                {
                    bucketId: config.appwriteBucketId,
                    fileId: ID.unique(),
                    file
                }
            );
        } catch (error) {
            console.log(`Appwrite :: uploadFile :: error :: `, error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                {
                    bucketId: config.appwriteBucketId,
                    fileId
                }
            );
            return true;
        } catch (error) {
            console.log(`Appwrite :: deleteFile :: error :: `, error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            {
                bucketId: config.appwriteBucketId,
                fileId
            }
        );
    }
}

const fileService = new FileService();

export default fileService;