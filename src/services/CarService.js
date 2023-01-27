import axios from "axios";

class CarService {

    getAllCars() { // Class function
        return axios.get("http://localhost:9090/api/v1/cars");
    }

    createCar(car) { 
        return axios.post("http://localhost:9090/api/v1/addcar", car);
    }

    updateCar(car) {
        return axios.put("http://localhost:9090/api/v1/updatecar", car);
    }

    deleteCar(car) { 
        // Note: data payload is different for request body in delete methods
        return axios.delete("http://localhost:9090/api/v1/deletecar", { data: car });
    }

}

export default new CarService()

