import axios from "axios";
// const PRODUCT_BASE_API_URL = "https://springbootdeploy-production.up.railway.app/api/v1";
const PRODUCT_BASE_API_URL = "http://localhost:8080/api/v1";

const access_token = JSON.parse(localStorage.getItem("user")).accessToken;

const config = {
  headers: {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

class ProductService {
  
  getAllProducts(pageNumber) {
    return axios.get(
      PRODUCT_BASE_API_URL + "/getProducts/" + pageNumber,
      config
    );
  }

  createProduct(product) {
    return axios.post(PRODUCT_BASE_API_URL + "/addProduct", product, config);
  }

  updateProduct(product, id) {
    return axios.put(
      PRODUCT_BASE_API_URL + "/updateProduct/" + id,
      product,
      config
    );
  }

  getProductById(productId) {
    return axios.get(PRODUCT_BASE_API_URL + "/getProduct/" + productId, config);
  }

  getAllBrands() {
    return axios.get(PRODUCT_BASE_API_URL + "/brands", config);
  }

  getAllSubcategory() {
    return axios.get(PRODUCT_BASE_API_URL + "/getAllSub", config);
  }

  getAllStatusType() {
    return axios.get(PRODUCT_BASE_API_URL + "/status", config);
  }

  deleteProductById(productId) {
    return axios.delete(
      PRODUCT_BASE_API_URL + "/deleteProduct/" + productId,
      config
    );
  }

  getTotalPages() {
    return axios.get(PRODUCT_BASE_API_URL + "/totalPage", config);
  }

  getAllCategory() {
    return axios.get(PRODUCT_BASE_API_URL + "/category", config);
  }

  getListProductSearch(searchData) {
    return axios.post(PRODUCT_BASE_API_URL + "/search", searchData, config);
  }

  loginRequest(loginData) {
    return axios.post(PRODUCT_BASE_API_URL + "/auth/login", loginData);
  }
}

const service = new ProductService();

export default service;
