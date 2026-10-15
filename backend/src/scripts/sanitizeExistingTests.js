import { connectDatabase, closeDatabase } from '../config/database.js';
import { Test } from '../models/Test.js';

async function sanitizeExistingTests() {
  await connectDatabase();
  console.log('Sanitizing existing tests in MongoDB...');

  await Test.collection.updateMany(
    { slug: /thermodynamics/ },
    { $set: { category: 'neet', examType: 'NEET', isPublic: true, status: 'published' } }
  );

  await Test.collection.updateMany(
    { slug: /chemical-bonding/ },
    { $set: { category: 'jee', examType: 'JEE_MAIN', isPublic: true, status: 'published', title: 'JEE 2027 - Chemical Bonding and Molecular Structure', slug: 'jee-2027-chemical-bonding-and-molecular-structure' } }
  );

  const finalTests = await Test.find({}).lean();
  console.log('\nFinal Tests in MongoDB:');
  finalTests.forEach((t) => {
    console.log(`- [${t.category}] ${t.title} (${t.slug}) - ${t.examType} - isPublic: ${t.isPublic} - status: ${t.status}`);
  });

  await closeDatabase();
}

sanitizeExistingTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
