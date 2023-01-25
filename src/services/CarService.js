import axios from "axios";

class CarService {

    getAllCars() { // Class function
        return axios.get("http://localhost:9090/api/v1/cars");
    }

}

export default new CarService()

