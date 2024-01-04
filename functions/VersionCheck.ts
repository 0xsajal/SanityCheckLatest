import { logActivity } from "./Logging";
import * as child_process from 'child_process';

export async function checkServiceVersion() {
  try {
    // Commands to check service versions
    const borVersionCommand = 'bor version';
    const heimdallVersionCommand = 'heimdalld version --long';

    // Execute commands to get versions using child_process.execSync
    const borStdout = child_process.execSync(borVersionCommand, { encoding: 'utf-8' });
    const heimdallStdout = child_process.execSync(heimdallVersionCommand, { encoding: 'utf-8' });

    // Check and log service versions or errors
    if (borStdout && heimdallStdout) {
       logActivity(`Bor Version Details: ${borStdout}\nHeimdall Version Details: ${heimdallStdout}`)
      } else {
       logActivity(`No version information available for Bor and Heimdall nodes.`);
    }
  } catch (error) {
    // Log any errors that occur
    console.error('Error checking versions:', error);
    logActivity('Error checking versions: ' + error.message);
  }
}
