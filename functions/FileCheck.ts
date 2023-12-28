import { FilesManager } from 'turbodepot-node';
import { logActivity } from './Logging'; // Import the logActivity function
import { diffLines } from 'diff';
import * as path from 'path';

const filesManager = new FilesManager();

const borConfig = '/var/lib/bor/config.toml';
const heimdallConfig = `/var/lib/heimdall/config/config.toml`;

export async function compareFiles(nodeType: string) {

  try {
    console.log("Check" ,nodeType)
    console.log(path.dirname(__filename))
    const borCheck = `../config/${nodeType}/bor.toml`;
    console.log('borCheck' ,borCheck)
    const heimdallCheck = `../config/${nodeType}/heimdall.toml`;    
    console.log('heimdallCheck', heimdallCheck)

    const contentb1 = await filesManager.readFile(borCheck);
    const contentb2 = await filesManager.readFile(borConfig);

    const contenth1 = await filesManager.readFile(heimdallCheck);
    const contenth2 = await filesManager.readFile(heimdallConfig);

    const differencesb = diffLines(contentb1, contentb2);
    const differencesh = diffLines(contenth1, contenth2);

    let changedParams = {};

    differencesb.forEach(diff => {
      if (diff.added) {
        // Handle added lines
        const lines = diff.value.split('\n');
        lines.forEach(line => {
          const trimmedLine = line.trim();
          if (trimmedLine && !trimmedLine.startsWith('#')) {
            const [paramName, paramValue] = trimmedLine.split('=').map(item => item.trim());
            if (paramName) {
              changedParams[paramName] = paramValue || null;
            }
          }
        });
      } else if (diff.removed) {
        // Handle removed lines
        const lines = diff.value.split('\n');
        lines.forEach(line => {
          const trimmedLine = line.trim();
          if (trimmedLine && !trimmedLine.startsWith('#')) {
            const [paramName] = trimmedLine.split('=').map(item => item.trim());
            if (paramName) {
              changedParams[paramName] = null;
            }
          }
        });
      }
    });

    differencesh.forEach(diff => {
      if (diff.added) {
        // Handle added lines
        const lines = diff.value.split('\n');
        lines.forEach(line => {
          const trimmedLine = line.trim();
          if (trimmedLine && !trimmedLine.startsWith('#')) {
            const [paramName, paramValue] = trimmedLine.split('=').map(item => item.trim());
            if (paramName) {
              changedParams[paramName] = paramValue || null;
            }
          }
        });
      } else if (diff.removed) {
        // Handle removed lines
        const lines = diff.value.split('\n');
        lines.forEach(line => {
          const trimmedLine = line.trim();
          if (trimmedLine && !trimmedLine.startsWith('#')) {
            const [paramName] = trimmedLine.split('=').map(item => item.trim());
            if (paramName) {
              changedParams[paramName] = null;
            }
          }
        });
      }
    });

    if (Object.keys(changedParams).length > 0) {
      // Log the differing parameters and values
      //  logActivity('Differing parameters and values:');
       console.log('Differing parameters and values:');
      for (const paramName in changedParams) {
        //  logActivity(`- ${paramName}: ${changedParams[paramName]}`);
         console.log(`- ${paramName}: ${changedParams[paramName]}`);
      }
    } else {
      // Log that the files have the same parameters and values
      // logActivity('The files have the same parameters and values.');
       console.log('The files have the same parameters and values.');
    }
  } catch (error) {
    // Log any errors that occur
    console.error('An error occurred:', error);
     logActivity(`An error occurred: ${error.message}`);
  }
}

