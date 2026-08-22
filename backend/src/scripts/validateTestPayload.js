import fs from 'node:fs';
import path from 'node:path';
import { importTestPayloadSchema } from '../validators/testImportValidator.js';

function validateFile(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  console.log(`\nValidating test payload: ${absolutePath}`);

  if (!fs.existsSync(absolutePath)) {
    console.error(`✕ Error: File not found at ${absolutePath}`);
    process.exit(1);
  }

  try {
    const rawContent = fs.readFileSync(absolutePath, 'utf8');
    const json = JSON.parse(rawContent);

    const result = importTestPayloadSchema.safeParse(json);
    if (!result.success) {
      console.error('\n✕ Validation Failed:');
      result.error.errors.forEach((err) => {
        console.error(`  • [${err.path.join('.')}] ${err.message}`);
      });
      process.exit(1);
    }

    const payload = result.data;
    console.log('\n✓ Test Payload is Valid!');
    console.log(`  • Title: "${payload.title}"`);
    console.log(`  • Questions: ${payload.questions.length}`);
    console.log(`  • Subjects: ${payload.subjects?.join(', ') || 'Auto-infer'}`);
    console.log(`  • Duration: ${payload.durationMinutes || `${payload.questions.length} mins (Auto-infer)`}`);
  } catch (err) {
    console.error(`✕ JSON parsing error: ${err.message}`);
    process.exit(1);
  }
}

const targetFile = process.argv[2];
if (!targetFile) {
  console.log('Usage: node src/scripts/validateTestPayload.js <path-to-test-json>');
  process.exit(1);
}

validateFile(targetFile);
