import axios from "axios";

class CustomerService {

    getAllCustomers(bearerTtoken) {
        const config = {
            headers: { Authorization: `Bearer ${bearerTtoken}` }
        };
        return axios.get("http://localhost:9090/api/v1/customers", config);
    }

    // getCustomerById(id) {
    //     console.log("I am in " + id);
    //     let currentCustomer;
    //     axios.get("http://localhost:9090/api/v1/customers")
    //         .then((response) => {
    //             // const allCustomers = response.data;
    //             // allCustomers.map((customer) => {
    //                 response.data.map((customer) => {
    //                 if (customer.id == id) {
    //                     currentCustomer = customer;
    //                     console.log(currentCustomer);
    //                     console.log(currentCustomer.fName);
    //                     return currentCustomer;
    //                 }
    //                 // return currentCustomer;
    //             });
    //         }).catch(error => {
    //             console.log(error);
    //         })
    //     return currentCustomer;
    // }

}

export default new CustomerService()

