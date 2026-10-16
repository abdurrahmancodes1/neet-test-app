import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { Result } from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const backupFileArg = process.argv[2];
  if (!backupFileArg) {
    console.error('Usage: node backend/src/scripts/restoreBackup.js <path-to-backup-json>');
    process.exit(1);
  }

  const resolvedPath = path.resolve(process.cwd(), backupFileArg);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Backup file not found at: ${resolvedPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(resolvedPath, 'utf8');
  const records = JSON.parse(raw);
  console.log(`Loaded ${records.length} records from backup file.`);

  await connectDatabase();

  let restored = 0;
  for (const doc of records) {
    const exists = await Result.findById(doc._id);
    if (!exists) {
      await Result.create(doc);
      restored++;
    }
  }

  console.log(`✓ Restored ${restored} missing records back to MongoDB.`);
  await closeDatabase();
}

main().catch((err) => {
  console.error('Restore error:', err);
  process.exit(1);
});
