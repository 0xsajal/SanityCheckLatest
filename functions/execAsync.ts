import { promisify } from 'util';
import { exec as childProcessExec } from 'child_process';

export const execAsync = promisify(childProcessExec);

export async function executeCommand(command: string): Promise<{ stdout: string; stderr: string; code: number }> {
  try {
    const { stdout, stderr } = await execAsync(command);
    return { stdout, stderr, code: 0 }; // Assuming success
  } catch (error) {
    return { stdout: '', stderr: error instanceof Error ? error.message : '', code: error instanceof Error ? 1 : 1 };
  }
}
