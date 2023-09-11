import React from "react";
import "../style/SeachStyle.css";
import { useState } from "react";
import service from "../service/ProductService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 

const SearchForm = () => {
  const [nameProduct, setNameProduct] = useState('');
  const [price, setPrice] = useState('');
  const [brandId, setBrandId] = useState(1);
  const [statusId, setStatusId] = useState(1);
  const [cateId, setCateId] = useState(1);
  const [optionBrands, setOptionBrands] = useState([]);
  const [optionCates, setOptionCates] = useState([]);
  const [optionStatus, setOptionStatus] = useState([]);
  const navigation = useNavigate();
  const access_token = JSON.parse(localStorage.getItem('user')).accessToken;

  useEffect(() => {
    service.getAllBrands(access_token).then((response) => {
      setOptionBrands(response.data);
    });
    service.getAllCategory(access_token).then((response) => {
      setOptionCates(response.data);
    });
    service.getAllStatusType(access_token).then((response) => {
      setOptionStatus(response.data);
    });
  }, [access_token]);

  const setToDefault = (e) => {
    e.preventDefault();
    navigation(`/product_frontend`);
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const dataSearch = {
      nameProduct,
      price,
      brandId,
      statusId,
      cateId,
    };
    service
      .getListProductSearch(dataSearch, access_token)
      .then((response) => {
        const url = `/search-product/`;
        const dataUrl = window.encodeURIComponent(`${JSON.stringify(response.data)}`);
        const finalUrl = url + dataUrl;
        navigation(finalUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="shadow p-3 mb-5 bg-white rounded mt-5">
      <form
        action=""
        className="d-flex justify-content-around align-items-center"
      >
        <div className="form-group search-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control search-input"
            onChange={(e) => setNameProduct(e.target.value)}
            value={nameProduct}
          />
        </div>
        <div className="form-group search-group">
          <label htmlFor="name" className="form-label">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            className="form-control search-input"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className="form-group search-group">
          <label htmlFor="brand" className="form-label">
            Brand
          </label>
          <select
            name="brand"
            id="brand"
            className="form-select"
            onChange={(e) => setBrandId(e.target.value)}
            value={brandId}
          >
            {optionBrands.map((optionBrand) => (
              <option key={optionBrand.id} value={optionBrand.id}>
                {optionBrand.brandName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group search-group">
          <label htmlFor="brand" className="form-label">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="form-select"
            onChange={(e) => setCateId(e.target.value)}
            value={cateId}
          >
            {optionCates.map((optionCate) => (
              <option key={optionCate.categoryId} value={optionCate.categoryId}>
                {optionCate.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group search-group">
          <label htmlFor="brand" className="form-label">
            Status
          </label>
          <select
            name="status"
            id="status"
            className="form-select"
            onChange={(e) => setStatusId(e.target.value)}
            value={statusId}
          >
            {optionStatus.map((option) => (
              <option key={option.id} value={option.id}>
                {option.statusName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="btn btn-success"
            style={{ borderRadius: "90px", height: "40px" }}
            onClick={(e) => handleSearch(e)}
          >
            <i className="fa fa-search"></i>
          </button>
          <button
            className="btn btn-secondary"
            style={{ borderRadius: "90px", height: "40px", marginLeft: "6px" }}
            onClick={(e) => setToDefault(e)}
          >
            <i className="fa fa-refresh"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
