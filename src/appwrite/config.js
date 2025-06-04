import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // create (database) post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title:title,
          content:content,
          featuredImage:featuredImage,
          status:status,
          userId:userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  // update existing post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
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
      throw error;
    }
  }

  // deleting the post
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  // get document(get single post)
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  // get all posts
  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  // above all for structured data, now for unstructured data

  // uploading files like images etc
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      return false;
    }
  }

  // delete file
  async deletefile(fileid) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileid
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(
      conf.appwriteBucketId,
      fileId
    );
  }
}

const service = new Service();

export default service;
