import { logActivity } from './Logging';
import * as child_process from 'child_process';

export async function checkAndAdjustPermissions() {
  try {
    // Commands to adjust permissions
    const borPermission = `sudo chown -R bor:nogroup /var/lib/bor`;
    const heimdallPermission = `sudo chown -R heimdall:nogroup /var/lib/heimdall`;

    // Execute the permission commands using child_process.execSync
     const borPerm = child_process.execSync(borPermission);
    const heimdallPerm = child_process.execSync(heimdallPermission);

    // Log that permissions were successfully adjusted
    //  logActivity('Permissions set for Bor & Heimdall');
      console.log(borPerm)
      console.log(heimdallPerm)
     console.log('Permissions set for Bor & Heimdall');
  } catch (error) {
    // Log any errors that occur
    console.error('Error checking/adjusting permissions:', error);
     logActivity('Error checking/adjusting permissions: ' + error.message);
  }
}

// Call the checkAndAdjustPermissions function
checkAndAdjustPermissions();
