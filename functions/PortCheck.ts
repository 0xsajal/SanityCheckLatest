import { logActivity } from "./Logging";
import * as child_process from 'child_process';

export async function checkOpenPorts(ports: string[]) {
  try {
    // Generate a regular expression pattern for matching ports
    const portList = ports.join(' | ');
    const openPortsCommand = `netstat -tuln | grep -E "${portList}"`;

    // Execute the command to check open ports using child_process.execSync
    const result = child_process.execSync(openPortsCommand, { encoding: 'utf-8' });
    console.log(typeof result)
    console.log(result)

    // Log open ports or errors
    if (result) {
       logActivity('Open ports:\n' + result);
    } else {
       logActivity('No open ports found.');
    }
  } catch (error) {
    // Log any errors that occur
    console.error('Error checking open ports:', error);
     logActivity('Error checking open ports: ' + error.message);
  }
}
