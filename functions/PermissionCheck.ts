import { logActivity } from './Logging';
import * as child_process from 'child_process';

export async function checkAndAdjustPermissions() {
  try {
    // Commands to adjust permissions
    const borPermission = 'sudo chown -R bor:nogroup /var/lib/bor';
    const heimdallPermission = 'sudo chown -R heimdall:nogroup /var/lib/heimdall';

    // Execute the permission commands using child_process.execSync
    const borPermOutput = child_process.execSync(borPermission, { encoding: 'utf-8' });
    const heimdallPermOutput = child_process.execSync(heimdallPermission, { encoding: 'utf-8' });

    // Log the output of each permission command
    logActivity('Permissions set for Bor.');
    logActivity(borPermOutput);
    logActivity('Permissions set for Heimdall.');
    logActivity(heimdallPermOutput);


  } catch (error) {
    // Check if the error is due to a user interrupt (Ctrl+C)
    if (error.status === 130) {
      logActivity('Script interrupted. Cleaning up...');
      // Perform cleanup or additional logging if needed
    } else {
      // Log any other errors that occur
      console.error('Error checking/adjusting permissions:', error);
      logActivity('Error checking/adjusting permissions: ' + error.message);
    }
  }
}

// Handle interrupt signal (Ctrl+C) gracefully
process.on('SIGINT', () => {
  logActivity('Script interrupted. Cleaning up...');
  // Perform cleanup or additional logging if needed
  process.exit();
});
