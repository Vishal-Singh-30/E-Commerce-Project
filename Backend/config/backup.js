const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const DB_URI = process.env.MONGO_URI;
const OUTPUT_DIR = path.join(__dirname, "../backups");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log("Backup folder created:", BACKUP_DIR);
}

const getTimestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}_${now
    .getHours()
    .toString()
    .padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}`;
};

const createBackup = () => {
  const timestamp = getTimestamp();
  const backupPath = path.join(OUTPUT_DIR, `backup_${timestamp}`);

  const command = `mongodump --uri="${DB_URI}" --out="${backupPath}"`;

  console.log(`Starting backup: ${backupPath}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during backup: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Backup stderr: ${stderr}`);
      return;
    }
    console.log(`Backup completed successfully: ${backupPath}`);
    console.log(`Command Output:\n${stdout}`);
  });
};

createBackup();

module.exports = createBackup;
