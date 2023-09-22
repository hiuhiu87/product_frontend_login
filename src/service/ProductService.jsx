import { axiosInstance, setCommonHeaders } from "../config/axiosConfig";

class ProductService {
  constructor() {
    this.accessToken = "";
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
    setCommonHeaders(accessToken);
  }

  getAllProducts(pageNumber) {
    return axiosInstance.get(`/getProducts/${pageNumber}`);
  }

  getAllProductsSearch() {
    return axiosInstance.get(`/getProducts`);
  }

  createProduct(product) {
    return axiosInstance.post("/addProduct", product);
  }

  updateProduct(product, id) {
    return axiosInstance.put(`/updateProduct/${id}`, product);
  }

  getProductById(productId) {
    return axiosInstance.get(`/getProduct/${productId}`);
  }

  getAllBrands() {
    return axiosInstance.get("/brands");
  }

  getAllSubcategory() {
    return axiosInstance.get("/getAllSub");
  }

  getAllStatusType() {
    return axiosInstance.get("/status");
  }

  deleteProductById(productId) {
    return axiosInstance.delete(`/deleteProduct/${productId}`);
  }

  getTotalPages() {
    return axiosInstance.get("/totalPage");
  }

  getAllCategory() {
    return axiosInstance.get("/category");
  }

  getListProductSearch(searchData) {
    return axiosInstance.post("/search", searchData);
  }

  loginRequest(loginData) {
    return axiosInstance.post("/auth/login", loginData);
  }

  registerRequest(registerData) {
    return axiosInstance.post("/auth/register", registerData);
  }
}

const service = new ProductService();

export default service;
