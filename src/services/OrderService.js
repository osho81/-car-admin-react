import axios from "axios";

class OrderService {

    getAllOrders(bearerTtoken) { 
        const config = {
            headers: { Authorization: `Bearer ${bearerTtoken}` }
        };
        return axios.get("http://localhost:9090/api/v1/orders", config);
    }

    updateOrder(newOrderDetails) {
        return axios.put("http://localhost:9090/api/v1/updateorder", newOrderDetails);
    }

}

export default new OrderService()