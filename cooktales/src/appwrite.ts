// filepath: src/appwrite.ts
import { Client, Account, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('68c2e2090030a8729312'); 

export const account = new Account(client);
export const databases = new Databases(client);