import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../service/ProductService";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import SearchForm from "./SearchFormComponent";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingComponent";
import "../style/TableStyle.css";
import Header from "./Header";

const TableProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchData } = useParams();
  const [records, setRecords] = useState([]);
  const dataLocalStorage = JSON.parse(localStorage.getItem("user"));
  const emailUser = dataLocalStorage.email;
  const accessToken = dataLocalStorage.accessToken;
  // console.log(emailUser);

  const showConfirmDelete = (productId) => {
    Swal.fire({
      title: "Thông Báo",
      text: "Bạn Có Chắc Chắn Muốn Xóa Sản Phẩm Này Không ?",
      icon: "warning",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((result) => {
      if (result["isConfirmed"]) {
        deleteProduct(productId);
      }
    });
  };

  const showPrevious = () => {
    return (
      <li className="page-item">
        <span
          style={{ cursor: "pointer" }}
          className="page-link"
          onClick={(e) => {
            if (currentPage < 1) {
              setCurrentPage(1);
            } else {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          Previous
        </span>
      </li>
    );
  };

  const showNext = () => {
    return (
      <li className="page-item">
        <span
          style={{ cursor: "pointer" }}
          className="page-link"
          onClick={(e) => {
            if (currentPage === totalPage) {
              setCurrentPage(totalPage);
            } else {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          Next
        </span>
      </li>
    );
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.productId,
      maxWidth: "10px",
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "Brand Name",
      selector: (row) => row.brandName,
      sortable: true,
    },
    {
      name: "Subcategory",
      selector: (row) => row.subCateName,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.sellPrice,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.statusName,
      sortable: true,
    },
    {
      name: "Function",
      cell: (row) => (
        <>
          <Link
            className="btn btn-secondary"
            to={`/detail-product/${row.productId}`}
          >
            <i className="fa fa-eye"></i>
          </Link>
          <Link
            className="btn btn-info"
            style={{ marginLeft: "10px" }}
            to={`/edit-product/${row.productId}`}
          >
            <i className="fa fa-pencil-square-o"></i>
          </Link>
          {"     "}
          <button
            className="btn btn-danger"
            onClick={() => {
              showConfirmDelete(row.productId);
            }}
            style={{ marginLeft: "10px" }}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </>
      ),
    },
  ];

  const handleFilter = (e) => {
    e.preventDefault();
    const newData = products.filter((row) => {
      return row.productName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const renderSearchName = () => {
    return (
      <div className="d-flex justify-content-end align-items-center form-search-name">
        <label htmlFor="search-input" id="label-search-input">
          Search By Name
        </label>
        <input
          className="form-control"
          id="search-input"
          type="text"
          onChange={(e) => handleFilter(e)}
        />
      </div>
    );
  };

  useEffect(() => {
    if (searchData !== null && searchData !== undefined) {
      const dataProduct = JSON.parse(window.decodeURIComponent(searchData));
      setRecords(dataProduct);
    }
  }, [searchData]);

  useLayoutEffect(() => {
    const getTotalPages = () => {
      service
        .getTotalPages(accessToken)
        .then((response) => {
          setTotalPage(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getProducts(currentPage);
    getTotalPages();
    // eslint-disable-next-line
  }, [currentPage]);

  const getProducts = (pageNumber) => {
    setIsLoading(true);
    service
      .getAllProducts(pageNumber, accessToken)
      .then((response) => {
        setCurrentPage(pageNumber);
        setProducts(response.data);
        setRecords(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (productId) => {
    service
      .deleteProductById(productId, accessToken)
      .then((response) => {
        getProducts(currentPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderButtonPage = () => {
    return (
      <Fragment>
        {Array(totalPage)
          .fill(null)
          .map((_, i) => (
            <li key={i} className="page-item">
              <span
                className="page-link"
                onClick={(e) => {
                  setCurrentPage(i + 1);
                  console.log(currentPage);
                }}
                style={{ cursor: "pointer" }}
              >
                {i + 1}
              </span>
            </li>
          ))}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Header emailUser={emailUser} title={"Product"} />
      <div className="container-sm">
        <SearchForm />
        <div className="shadow p-3 mb-5 bg-white rounded mt-5">
          <Link to="/add-product" className="btn btn-primary mb-2">
            Add Product
          </Link>
          {renderSearchName()}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <DataTable columns={columns} data={records} />
          )}
          <nav className="d-flex justify-content-center">
            <ul className="pagination mt-3">
              {currentPage === 1 ? !showPrevious() : showPrevious()}
              {renderButtonPage()}
              {currentPage >= totalPage ? !showNext() : showNext()}
            </ul>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

export default TableProduct;
