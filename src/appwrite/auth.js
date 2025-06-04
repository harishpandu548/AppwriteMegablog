import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  
  // create account
  async createAccount({ email, password, name }) {
    try {
        const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });// if signup direct login no need to add another step of login
      } else return userAccount;// if signup failed it shows error or whats so ever

    } catch (error) {
      throw error;
    }
  }

  // login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // get account
  async getcurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    
  }

  // logout
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authservice = new Authservice();

export default authservice;
