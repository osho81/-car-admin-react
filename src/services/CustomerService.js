import axios from "axios";

class CustomerService {

    getAllCustomers() {
        return axios.get("http://localhost:9090/api/v1/customers");
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

    // createCar(car) { 
    //     return axios.post("http://localhost:9090/api/v1/addcar", car);
    // }


}

export default new CustomerService()

