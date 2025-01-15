import { NhostClient } from '@nhost/nhost-js';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const subDom=process.env.SUBDOMAIN;
const regionHost=process.env.REGION;

const nhost = new NhostClient({
  subdomain: subDom, // Replace with your project subdomain
  region: regionHost,        // Replace with your region, e.g., "us-east-1"
});

export default nhost;
