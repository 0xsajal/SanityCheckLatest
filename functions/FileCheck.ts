import { FilesManager } from 'turbodepot-node';
import { logActivity, startLogging, stopLogging } from './Logging'; // Import the logActivity function
import { diffLines } from 'diff';
import * as path from 'path';


const filesManager = new FilesManager();

const borConfig = '/var/lib/bor/config.toml';
const heimdallConfig = `/var/lib/heimdall/config/config.toml`;

export async function compareFiles(nodeType: string) {

  try {
    const cwd = process.cwd();
    const borCheck = path.join(cwd + `/config/${nodeType}/bor.toml`)
    const heimdallCheck = path.join(cwd, `/config/${nodeType}/heimdall.toml`)   

    const contentb1 = await filesManager.readFile(borCheck);
    const contentb2 = await filesManager.readFile(borConfig);

    const contenth1 = await filesManager.readFile(heimdallCheck);
    const contenth2 = await filesManager.readFile(heimdallConfig);

    const differencesb = diffLines(contentb1, contentb2);
    const differencesh = diffLines(contenth1, contenth2);
    const diffrencesToPrintForBor: Array<string> = []
    differencesb.forEach(item => {
      if (item.removed) {
        diffrencesToPrintForBor.push(item.value)
      }
    })

    logActivity('Diffrences on bor config.toml:')
    logActivity( diffrencesToPrintForBor.toString())


    const diffrencesToPrintForHeimdall: Array<string> = []
    differencesh.forEach(item => {
      if (item.removed) {
        diffrencesToPrintForHeimdall.push(item.value)
      }
    })

    logActivity('Diffrences on heimdall config.toml:')
    logActivity( diffrencesToPrintForHeimdall.toString())

  } catch (error) {
    // Log any errors that occur
    console.error('An error occurred:', error);
     logActivity(`An error occurred: ${error.message}`);
  }
}

