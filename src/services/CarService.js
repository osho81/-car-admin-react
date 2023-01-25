import axios from "axios";

class CarService {

    getAllCars() { // Class function
        return axios.get("http://localhost:9090/api/v1/cars");
    }

    createCar(car) { // Class function
        return axios.post("http://localhost:9090/api/v1/addcar", car);
    }


}

export default new CarService()

