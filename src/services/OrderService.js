import axios from "axios";

class OrderService {

    getAllOrders() { 
        return axios.get("http://localhost:9090/api/v1/orders");
    }

    updateOrder(newOrderDetails) {
        return axios.put("http://localhost:9090/api/v1/updateorder", newOrderDetails);
    }

}

export default new OrderService()