import axios from "axios";

class OrderService {

    getAllOrders() { 
        return axios.get("http://localhost:9090/api/v1/orders");
    }

}

export default new OrderService()