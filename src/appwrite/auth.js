import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async login({email, password}) {
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try{
            const account = await this.account.get();
            return account;

        }catch (error) {
            console.log("Error getting account:", error);
        }
        return null;
    }
    async logout(){
        try {
            const session = await this.account.deleteSessions('current');
            return session;
            
        } catch (error) {
            console.log("Error logging out:", error);
        }
    }
}

const authService = new AuthService();

export default authService;