# Swapsoul - Backend

## Add following environment variables into system
- `SMTPHOST`
- `SMTPPORT`
- `FromEmail`
- `EmailPassword`
- `EmailReplyTo`

## Backup and Restore
- Install mongo-tools : `sudo apt install mongo-tools`
- Run below command to create dump
    - `mongodump --uri="mongodb+srv://swapsoul:$password@cluster0.bz4pl.mongodb.net/test" --forceTableScan --out "atlas-test"`

- Run below command to restore from dump
    - `mongorestore --uri="mongodb+srv://swapsoul:$password@cluster0.bz4pl.mongodb.net/production" -d production atlas-test/test`
