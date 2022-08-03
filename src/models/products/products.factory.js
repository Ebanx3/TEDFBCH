import config from "../../config";
import productsMongooseController from "./products.mongo";
import productsMemoryController from "./products.memory";

const productsFactory = () => {
    switch(config.PERSISTENCE){
        case 'mongo': {
            return productsMongooseController;
        }
        case 'memory': {
            return productsMemoryController;
        }
        default : {
            return productsMemoryController;
        }
    }
};

export default productsFactory;