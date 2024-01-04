import * as fs from 'fs';
import * as path from 'path';

let logStream: fs.WriteStream | null = null;

export function startLogging() {
  // Generate the log file name with the current date and time
  const currentDateTime = new Date().toISOString().replace(/[-:.]/g, '_');
  const logFileName = `${currentDateTime}.log`;

  // Define the directory for log files (assumes it's in the project directory)
  const scriptURL = import.meta.url;
  const scriptPath = new URL(scriptURL).pathname;
  const projectDirectory = path.dirname(scriptPath);
  const logDirectory = path.join(projectDirectory, '../logs');
  // Ensure the logs directory exists, create it if it doesn't
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  // Create a write stream to the log file
  const logFilePath = path.join(logDirectory, logFileName);
  logStream = fs.createWriteStream(logFilePath, { flags: 'a' }); // 'a' for append mode
}

export function logActivity(logMessage: string) {
  if (logStream) {
    // Append logMessage to the log file with a timestamp
    logStream.write(`${new Date().toUTCString()}: ${logMessage}\n`);

    // Log the message to the console
    console.log(logMessage);
  }
}

export function stopLogging() {
  if (logStream) {
    // Close the log stream when you're done with logging
    logStream.end();
    logStream = null;
  }
}

