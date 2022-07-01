import mongoose from 'mongoose'
import mongoConfig from '../config/mongoConfig'

const url = `mongodb+srv://${mongoConfig.host.dbUsername}:${mongoConfig.host.dbPassword}@${mongoConfig.host.cluster}/${mongoConfig.dbName}?retryWrites=true&w=majority`

export class MongoDB {
    connect = async () => {
        //mongoose.set('debug', true);
        console.log('Connecting to DB');

        if (mongoose.connection.readyState == 1) {

            console.log('Using old connection');

            return mongoose;
        }
        else {
            console.log('Creating new connection');
            await mongoose.connect(url, {
                dbName: mongoConfig.dbName
            });
            console.log(`New connection created  ${mongoose.connection.readyState}`);

            return mongoose;
        }

    }

    close = async () => {


        if (mongoose.connection.readyState == 1) {

            console.log('Mongo Connection closed');

            mongoose.connection.close();

        }
    }
}