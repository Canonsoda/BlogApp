import conf from "../conf/conf.js";
import { Client, ID,Databases,Storage,Query ,Permission} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint("https://fra.cloud.appwrite.io/v1")
            .setProject("68189b6300038186e8a6");
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug,content,featuredImage, status,userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );            
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }
    async updatePost(slug,{title,content,featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );            
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            ); 
            return true;           
        } catch (error) {
            console.error("Error deleting post:", error);
            throw error;
        }
    }
    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return post;            
        } catch (error) {
            console.error("Error getting post:", error);
            throw error;
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
            return posts;            
        } catch (error) {
            console.error("Error getting posts:", error);
            throw error;
        }
    }

    //file upload and delete
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                [
                    Permission.read(Role.users())
                ]
            )
            
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
            
        }
    }
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
            
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service = new Service();
export default service;