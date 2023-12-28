import { logActivity } from './Logging';
import * as fs from 'fs';

export async function checkDataDirectory() {
  try {
    // Data directory paths
    const borDataDirectory = '/var/lib/bor/data/bor/chaindata';
    const heimdallDataDirectory = '/var/lib/heimdall/data';

    // Check if directories exist using fs.promises.access
    await fs.promises.access(borDataDirectory, fs.constants.R_OK | fs.constants.W_OK);
    await fs.promises.access(heimdallDataDirectory, fs.constants.R_OK | fs.constants.W_OK);

    // If no errors were thrown, the directories exist
    //  logActivity('Bor and Heimdall data directories exist.');
    console.log('Bor and Heimdall data directories exist.');
  } catch (error: any) 
  { // Type assertion to 'any'
    if (error.code === 'ENOENT') {
      //  logActivity('Data directory does not exist.');
      console.log('Data directory does not exist.');
    } else {
      console.error('Error checking data directory:', error);
      //  logActivity(`Error checking data directory: ${error.message}`);
    }
  }
}
