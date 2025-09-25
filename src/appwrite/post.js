import {Client, Query, TablesDB} from "appwrite";
import config from "../config/config.js";

class PostService {
    client = new Client();
    tablesDB;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.tablesDB = new TablesDB(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.tablesDB.createRow(
                {
                    databaseId: config.appwriteDatabaseId,
                    tableId: config.appwriteTableId,
                    rowId: slug,
                    data: {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId
                    }
                }
            );
        } catch (error) {
            console.log(`Appwrite service :: createPost :: error :: `, error);
        }
    }

    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow(
                {
                    databaseId: config.appwriteDatabaseId,
                    tableId: config.appwriteTableId,
                    rowId: slug
                }
            );
            return true;
        } catch (error) {
            console.log(`Appwrite service :: deletePost :: error :: `, error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow(
                {
                    databaseId: config.appwriteDatabaseId,
                    tableId: config.appwriteTableId,
                    rowId: slug
                }
            );
        } catch (error) {
            console.log(`Appwrite service :: getPost :: error :: `, error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.tablesDB.listRows(
                {
                    databaseId: config.appwriteDatabaseId,
                    tableId: config.appwriteTableId,
                    queries
                }
            );
        } catch (error) {
            console.log(`Appwrite service :: getPosts :: error :: `, error);
            return false;
        }
    }
}

const postService = new PostService();

export default postService;