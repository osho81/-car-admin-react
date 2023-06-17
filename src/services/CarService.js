import axios from "axios";

// TODO: set base url here, for easier reuse in requests hereunder

class CarService { // Class function

    getAllCars(bearerToken) {
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` }
        };
        return axios.get("http://192.168.0.153:9090/api/v1/cars", config);
    }

    createCar(car, bearerToken) {
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` }
        };
        return axios.post("http://localhost:9090/api/v1/addcar", car, config);
    }

    updateCar(car, bearerToken) {
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` }
        };
        return axios.put("http://localhost:9090/api/v1/updatecar", car, config);
    }

    deleteCar(car, bearerToken) {
        const config = {
            data: car,
            headers: { Authorization: `Bearer ${bearerToken}` }
        };
        // Note: data payload is different for request body in delete methods
        return axios.delete("http://localhost:9090/api/v1/deletecar", config);
    }

}

export default new CarService()

