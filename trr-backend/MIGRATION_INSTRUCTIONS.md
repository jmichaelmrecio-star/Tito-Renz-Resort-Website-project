# Service Migration Instructions

## Overview
This migration moves all hardcoded services from code files into MongoDB database.

## Steps to Migrate

### 1. Run the Migration Script

Open PowerShell in the `trr-backend` folder and run:

```powershell
node migrateServices.js
```

### 2. What the Script Does

- Connects to your MongoDB database
- Checks for existing services
- Inserts all 14 hardcoded services (Villas, Charms, Venues)
- Skips duplicates automatically
- Shows a summary report

### 3. Expected Output

```
✅ Connected to MongoDB
📦 Migrating 14 hardcoded services to MongoDB...
✅ Migrated: Villa #1
✅ Migrated: Villa #2
...
📊 Migration Summary:
   ✅ Successfully migrated: 14
   ⏭️  Skipped (duplicates): 0
   ❌ Errors: 0
   📦 Total in database: 14
✅ Migration complete.
```

### 4. Restart Your Backend Server

After migration, restart the backend:

```powershell
# Stop the current server (Ctrl+C)
# Then start it again
node server.js
```

### 5. Verify Migration

1. Open Admin Dashboard in browser
2. Go to "Services" tab
3. You should see all 14 services listed
4. Check index.html - service cards should load from database
5. Check services-list.html - all services should be clickable
6. Check amenities.html - filters should work

## What Changed

### Before Migration:
- Services hardcoded in `config/servicesData.js` and frontend `script.js`
- Public pages used hardcoded data
- Admin couldn't manage existing services

### After Migration:
- All services stored in MongoDB
- All pages fetch from database
- Admin can create, edit, and deactivate any service
- New services appear immediately on all pages

## Troubleshooting

### "Services already exist" Warning
If you see this, the script detected existing services. By default, it will merge (skip duplicates). To change behavior, edit `migrateServices.js` line 19-21.

### "No services found" in Admin Dashboard
- Make sure migration script completed successfully
- Check MongoDB connection in `.env` file
- Restart backend server

### Service cards not loading on frontend
- Check browser console for errors
- Verify `/api/services` endpoint returns data
- Clear browser cache and refresh

## Rollback (If Needed)

To remove migrated services:

```javascript
// Run in MongoDB shell or create a script:
use your_database_name
db.services.deleteMany({})
```

Then restore the hardcoded routes in `server.js` if needed.
