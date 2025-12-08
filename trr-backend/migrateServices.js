// Migration script to move hardcoded services to MongoDB
require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const servicesData = require('./config/servicesData');

const migrateServices = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if services already exist
        const existingCount = await Service.countDocuments();
        if (existingCount > 0) {
            console.log(`⚠️  Warning: ${existingCount} services already exist in the database.`);
            console.log('Do you want to:');
            console.log('1. Skip migration (keep existing services)');
            console.log('2. Clear database and migrate fresh');
            console.log('3. Add hardcoded services without clearing (merge)');
            console.log('\nTo proceed, modify this script to set your choice.');
            
            // UNCOMMENT ONE OF THESE OPTIONS:
            // const choice = 1; // Skip migration
            // const choice = 2; // Clear and migrate
            const choice = 3; // Merge (default)
            
            if (choice === 1) {
                console.log('✅ Migration skipped. Existing services preserved.');
                await mongoose.connection.close();
                return;
            }
            
            if (choice === 2) {
                await Service.deleteMany({});
                console.log('🗑️  Cleared existing services.');
            }
        }

        // Insert hardcoded services
        console.log(`\n📦 Migrating ${servicesData.length} hardcoded services to MongoDB...`);
        
        let successCount = 0;
        let skipCount = 0;
        let errorCount = 0;

        for (const serviceData of servicesData) {
            try {
                // Check if service with this ID already exists
                const existing = await Service.findOne({ id: serviceData.id });
                
                if (existing) {
                    console.log(`⏭️  Skipped: ${serviceData.name} (already exists)`);
                    skipCount++;
                    continue;
                }

                // Create new service
                const service = new Service(serviceData);
                await service.save();
                console.log(`✅ Migrated: ${serviceData.name}`);
                successCount++;
            } catch (error) {
                console.error(`❌ Error migrating ${serviceData.name}:`, error.message);
                errorCount++;
            }
        }

        console.log('\n📊 Migration Summary:');
        console.log(`   ✅ Successfully migrated: ${successCount}`);
        console.log(`   ⏭️  Skipped (duplicates): ${skipCount}`);
        console.log(`   ❌ Errors: ${errorCount}`);
        console.log(`   📦 Total in database: ${await Service.countDocuments()}`);

        // Close connection
        await mongoose.connection.close();
        console.log('\n✅ Migration complete. Database connection closed.');

    } catch (error) {
        console.error('❌ Migration failed:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

// Run migration
migrateServices();
