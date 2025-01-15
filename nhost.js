import { NhostClient } from '@nhost/nhost-js';

const nhost = new NhostClient({
  subdomain: 'qytjethtygmblnijsubg', // Replace with your project subdomain
  region: 'ap-south-1',        // Replace with your region, e.g., "us-east-1"
});

export default nhost;
