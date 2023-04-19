import axios from "axios";

class CarService { // Class function

    getAllCars(bearerTtoken) {
        const config = {
            headers: { Authorization: `Bearer ${bearerTtoken}` }
        };
        return axios.get("http://192.168.0.153:9090/api/v1/cars", config);
    }

    createCar(car, bearerTtoken) {
        const config = {
            headers: { Authorization: `Bearer ${bearerTtoken}` }
        };
        return axios.post("http://localhost:9090/api/v1/addcar", car, config);
    }

    updateCar(car, bearerTtoken) {
        const config = {
            headers: { Authorization: `Bearer ${bearerTtoken}` }
        };
        return axios.put("http://localhost:9090/api/v1/updatecar", car, config);
    }

    deleteCar(car, bearerTtoken) {
        const config = {
            data: car,
            headers: { Authorization: `Bearer ${bearerTtoken}` }
        };
        // Note: data payload is different for request body in delete methods
        return axios.delete("http://localhost:9090/api/v1/deletecar", config);
    }

}

export default new CarService()

