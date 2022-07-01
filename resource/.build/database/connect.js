"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoConfig_1 = __importDefault(require("../config/mongoConfig"));
const url = `mongodb+srv://${mongoConfig_1.default.host.dbUsername}:${mongoConfig_1.default.host.dbPassword}@${mongoConfig_1.default.host.cluster}/${mongoConfig_1.default.dbName}?retryWrites=true&w=majority`;
class MongoDB {
    constructor() {
        this.connect = async () => {
            //mongoose.set('debug', true);
            console.log('Connecting to DB');
            if (mongoose_1.default.connection.readyState == 1) {
                console.log('Using old connection');
                return mongoose_1.default;
            }
            else {
                console.log('Creating new connection');
                await mongoose_1.default.connect(url, {
                    dbName: mongoConfig_1.default.dbName
                });
                console.log(`New connection created  ${mongoose_1.default.connection.readyState}`);
                return mongoose_1.default;
            }
        };
        this.close = async () => {
            if (mongoose_1.default.connection.readyState == 1) {
                console.log('Mongo Connection closed');
                mongoose_1.default.connection.close();
            }
        };
    }
}
exports.MongoDB = MongoDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2RhdGFiYXNlL2Nvbm5lY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQStCO0FBQy9CLHdFQUErQztBQUUvQyxNQUFNLEdBQUcsR0FBRyxpQkFBaUIscUJBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLHFCQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxxQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUkscUJBQVcsQ0FBQyxNQUFNLDhCQUE4QixDQUFBO0FBRXZLLE1BQWEsT0FBTztJQUFwQjtRQUNJLFlBQU8sR0FBRyxLQUFLLElBQUksRUFBRTtZQUNqQiw4QkFBOEI7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRWhDLElBQUksa0JBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRTtnQkFFckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUVwQyxPQUFPLGtCQUFRLENBQUM7YUFDbkI7aUJBQ0k7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLGtCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtvQkFDeEIsTUFBTSxFQUFFLHFCQUFXLENBQUMsTUFBTTtpQkFDN0IsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLGtCQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBRXpFLE9BQU8sa0JBQVEsQ0FBQzthQUNuQjtRQUVMLENBQUMsQ0FBQTtRQUVELFVBQUssR0FBRyxLQUFLLElBQUksRUFBRTtZQUdmLElBQUksa0JBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRTtnQkFFckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2dCQUV2QyxrQkFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUUvQjtRQUNMLENBQUMsQ0FBQTtJQUNMLENBQUM7Q0FBQTtBQWxDRCwwQkFrQ0MifQ==