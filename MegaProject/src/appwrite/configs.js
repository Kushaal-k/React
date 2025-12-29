import config from '../config/config'
import { Client, ID, Storage, Query, TablesDB  } from 'appwrite'

export class Service{
    client = new Client();
    bucket;
    tableDB;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.bucket = new Storage(this.client);
        this.tableDB = new TablesDB(this.client)

    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.tableDB.createRow(
                {
                    databaseId: config.appwriteDatabaseId,
                    tableId: config.appwriteTableId,
                    rowId: slug,
                    data: {title, content, featuredImage, status, userId }
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.tableDB.updateRow(
                {
                    databaseId: config.appwriteDatabaseId,
                    tableId: config.appwriteTableId,
                    rowId: slug,
                    data : {
                        title, content, featuredImage, status
                    }
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error);
        }
    }

    async deletePost(slug){
        try {
            return await this.tableDB.deleteRow(
                {
                    databaseId: config.appwriteDatabaseId,
                    tableId: config.appwriteTableId,
                    rowId: slug,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error);
        }
    }

    async getPost(slug){
        try {
            const post = await this.tableDB.getRow(
                {
                    databaseId: config.appwriteDatabaseId,
                    tableId: config.appwriteTableId,
                    rowId: slug,
                }
            )

            if(post) return post;
            return false;
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error ", error);
        }
    }

    async getAllPosts(){
        try {
            return await this.tableDB.listRows({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                queries: [Query.equal("status", "active")]
            })
        } catch (error) {
            console.log("Appwrite Service :: getAllPosts :: error", error);
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error ", error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId: config.appwriteBucketId,
                fileId
            })
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error ", error);
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview({
            bucketId: config.appwriteBucketId,
            fileId,
            height: 200,
            width: 200,
            background: "black",
            borderRadius: "12px",
            
        })
    }
}

const service = new Service()

export default service;