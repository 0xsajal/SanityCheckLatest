import { compareFiles } from './functions/FileCheck';
import { checkDataDirectory } from './functions/DirectoryCheck';
import { checkAndAdjustPermissions } from './functions/PermissionCheck'
import { checkOpenPorts } from './functions/PortCheck';
import { checkServiceVersion } from './functions/VersionCheck';
import { getAndLogCommandOutput } from './functions/CommandOutput';


/**
 * Compare Bor and Heimdall configuration files and handle any differences or errors.
 * @param nodeType - The type of the node (e.g., "sentry").
 */

// Main function
async function main(nodeType: string) {
    // Check and compare the configurations
    console.log('1')
    await compareFiles(nodeType);
  
    // // Check data directories
    // console.log('2')
    // await checkDataDirectory();
  
    // // Check and adjust permissions
    // console.log('3')
    // await checkAndAdjustPermissions();
  
    // Check service versions
    // await checkServiceVersion();
  
    // Check open ports (22, 26656, and 30303)
    // await checkOpenPorts(['22']);
    // await checkOpenPorts(['26656']);
    // await checkOpenPorts(['30303']);
  
    // // Get and log the output of specific commands
    // await getAndLogCommandOutput(`curl http://localhost:8545 -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["finalized", false],"id":1}' -H "Content-Type: application/json"`);
  
    // await getAndLogCommandOutput('curl localhost:1317/checkpoints/latest', 'Latest checkpoint using cURL:');
  
    // // Get and log the latest 100 lines of Bor and Heimdall service logs
    // await getAndLogCommandOutput('journalctl --unit=bor.service --no-pager -n 100');
    // await getAndLogCommandOutput('journalctl --unit=heimdalld.service --no-pager -n 100');
  }
  
  // Check if a valid node type is provided as a command-line argument
  const validNodeTypes = ['sentry', 'validator'];
  const providedNodeType = process.argv[2];
  
  if (!providedNodeType || !validNodeTypes.includes(providedNodeType)) {
    console.error('Please provide a valid node type (sentry or validator) as a command-line argument.');
  } else {
    // Call the main function with the provided node type
    main(providedNodeType);
  }
  