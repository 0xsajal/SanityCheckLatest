import { logActivity } from "./Logging";
import * as child_process from 'child_process';

 export async function getAndLogCommandOutput(command: string, logMessage: string) {
  try {
    // Execute the specified command using child_process.execSync
    const result = child_process.execSync(command, { encoding: 'utf-8' });

    // Log the command output or errors
    if (result) {
       logActivity(logMessage + '\n' + result);
    } else {
       logActivity(`Error running command: ${command}\nNo output was generated.`);
    }
  } catch (error) {
    // Log any errors that occur
     logActivity(`Error running command: ${command}\nError: ${error.message}`);
  }
}
