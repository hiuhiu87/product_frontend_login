import axios from "axios";
// const PRODUCT_BASE_API_URL = "https://springbootdeploy-production.up.railway.app/api/v1";
const PRODUCT_BASE_API_URL = "http://localhost:8080/api/v1";
// const userLogin = localStorage.getItem("user");
// let access_token;
// if (userLogin === 'null') {
//   console.log(typeof userLogin);
// }else{
//   access_token = JSON.parse(userLogin).accessToken;
// }

// const config = {
//   headers: {
//     Authorization: `Bearer ${access_token}`,
//     "Content-Type": "application/json",
//     Accept: "*/*",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Credentials": true,
//   },
// };

class ProductService {
  
  getAllProducts(pageNumber, access_token) {
    return axios.get(
      PRODUCT_BASE_API_URL + "/getProducts/" + pageNumber,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
  }

  createProduct(product, access_token) {
    return axios.post(PRODUCT_BASE_API_URL + "/addProduct", product, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }

  updateProduct(product, id, access_token) {
    return axios.put(
      PRODUCT_BASE_API_URL + "/updateProduct/" + id,
      product,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
  }

  getProductById(productId, access_token) {
    return axios.get(PRODUCT_BASE_API_URL + "/getProduct/" + productId, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }

  getAllBrands(access_token) {
    return axios.get(PRODUCT_BASE_API_URL + "/brands", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }

  getAllSubcategory(access_token) {
    return axios.get(PRODUCT_BASE_API_URL + "/getAllSub", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }

  getAllStatusType(access_token) {
    return axios.get(PRODUCT_BASE_API_URL + "/status", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }

  deleteProductById(productId, access_token) {
    return axios.delete(
      PRODUCT_BASE_API_URL + "/deleteProduct/" + productId,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
  }

  getTotalPages(access_token) {
    return axios.get(PRODUCT_BASE_API_URL + "/totalPage", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }

  getAllCategory(access_token) {
    return axios.get(PRODUCT_BASE_API_URL + "/category", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }

  getListProductSearch(searchData, access_token) {
    return axios.post(PRODUCT_BASE_API_URL + "/search", searchData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }

  loginRequest(loginData) {
    return axios.post(PRODUCT_BASE_API_URL + "/auth/login", loginData);
  }

  registerRequest(registerData) {
    return axios.post(PRODUCT_BASE_API_URL + "/auth/register", registerData);
  }

}

const service = new ProductService();

export default service;
