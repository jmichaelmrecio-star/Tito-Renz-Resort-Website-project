/**
 * Migration script to remove unique index on 'date' field in BlockedDate collection
 * This allows multiple services to be blocked on the same date
 */

require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

async function fixIndex() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;
        const collection = db.collection('blockeddates');

        // List existing indexes
        console.log('\n📋 Current indexes:');
        const indexes = await collection.indexes();
        indexes.forEach(index => {
            console.log(`  - ${index.name}:`, JSON.stringify(index.key));
        });

        // Drop the unique index on 'date' field
        try {
            await collection.dropIndex('date_1');
            console.log('\n✅ Successfully dropped unique index on "date" field');
        } catch (err) {
            if (err.code === 27) {
                console.log('\n⚠️  Index "date_1" does not exist (already removed or never created)');
            } else {
                throw err;
            }
        }

        // List indexes after removal
        console.log('\n📋 Indexes after fix:');
        const updatedIndexes = await collection.indexes();
        updatedIndexes.forEach(index => {
            console.log(`  - ${index.name}:`, JSON.stringify(index.key));
        });

        console.log('\n✅ Migration complete!');
        console.log('You can now block multiple services on the same date.');

    } catch (error) {
        console.error('❌ Error during migration:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Database connection closed');
        process.exit(0);
    }
}

fixIndex();
