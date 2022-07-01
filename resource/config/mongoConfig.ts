export default {
    dbName: 'console',
    host: {
        cluster: process.env.MONGO_DB_CLUSTER,
        dbUsername: process.env.MONGO_DB_U,
        dbPassword: process.env.MONGO_DB_P,
    }
}