import React from "react";
import { useState } from "react";
import service from "../service/ProductService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SearchForm = () => {
  const [nameProduct, setNameProduct] = useState("");
  const [price, setPrice] = useState("");
  const [brandId, setBrandId] = useState();
  const [statusId, setStatusId] = useState();
  const [cateId, setCateId] = useState();
  const [optionBrands, setOptionBrands] = useState([]);
  const [optionCates, setOptionCates] = useState([]);
  const [optionStatus, setOptionStatus] = useState([]);
  const navigation = useNavigate();
  const access_token = JSON.parse(localStorage.getItem("user")).accessToken;
  service.setAccessToken(access_token);

  const showAlertSearch = () => {
    Swal.fire({
      title: "Thông Báo",
      text: "Bạn Cần Chọn Ít Nhất 1 Trường Để Tìm Kiếm",
      icon: "warning",
      confirmButtonText: "OK",
      timer: 2000,
    });
  };

  useEffect(() => {
    service.getAllBrands().then((response) => {
      setOptionBrands(response.data);
    });
    service.getAllCategory().then((response) => {
      setOptionCates(response.data);
    });
    service.getAllStatusType().then((response) => {
      setOptionStatus(response.data);
    });

    return () => {
      setOptionBrands([]);
      setOptionCates([]);
      setOptionStatus([]);
    }
  }, [access_token]);

  const handleSearch = (e) => {
    e.preventDefault();
    let countCheck = 0;
    const dataSearch = {
      nameProduct,
      price,
      brandId,
      statusId,
      cateId,
    };

    for (const data in dataSearch) {
      if (dataSearch[data] === "" || dataSearch[data] === undefined) {
        countCheck++;
      }
    }

    if (countCheck === 5) {
      showAlertSearch();
      return;
    }

    service
      .getListProductSearch(dataSearch)
      .then((response) => {
        const url = `/search-product/`;
        const dataUrl = window.encodeURIComponent(
          `${JSON.stringify(response.data)}`
        );
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
            <option value="">--Choose Opts--</option>
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
            <option value="">--Choose Opts--</option>
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
            <option value="">--Choose Opts--</option>
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
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
