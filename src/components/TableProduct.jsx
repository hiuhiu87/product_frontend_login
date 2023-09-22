import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import service from "../service/ProductService";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import SearchForm from "./SearchFormComponent";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingComponent";
import Header from "./Header";
import { Button, Container, Pagination } from "react-bootstrap";

const TableProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchData } = useParams();
  const [records, setRecords] = useState([]);
  const [AllProducts, setAllProducts] = useState([]);
  const dataLocalStorage = JSON.parse(localStorage.getItem("user"));
  const emailUser = dataLocalStorage.email;
  const accessToken = dataLocalStorage.accessToken;
  const roles = dataLocalStorage.role;
  const previousTotalPage = useRef(totalPage);
  service.setAccessToken(accessToken);

  const handleReset = () => {
    setRecords(products);
    window.location.replace("/product_frontend");
  };

  const checkRole = () => {
    for (const role of roles) {
      if (role === "ROLE_ADMIN") {
        return true;
      }
    }
    return false;
  };

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
        <Pagination.Prev
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            if (currentPage < 1) {
              setCurrentPage(1);
            } else {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          Previous
        </Pagination.Prev>
    );
  };

  const showNext = () => {
    return (
        <Pagination.Next
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            if (currentPage === totalPage) {
              setCurrentPage(totalPage);
            } else {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          Next
        </Pagination.Next>
    );
  };

  const renderUpdateDeleteFunction = (row) => {
    return (
      <Fragment>
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
      </Fragment>
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
          {checkRole() ? renderUpdateDeleteFunction(row) : null}
        </>
      ),
    },
  ];

  const handleFilter = (e) => {
    e.preventDefault();
    const newData = AllProducts.filter((row) => {
      return row.productName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
    if (e.target.value === "") {
      setRecords(products);
    }
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

  const getTotalPages = () => {
    service
      .getTotalPages()
      .then((response) => {
        setTotalPage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    previousTotalPage.current = totalPage;

    if (previousTotalPage.current > totalPage) {
      setCurrentPage(currentPage - 1);
    }

    if (previousTotalPage.current < totalPage) {
      setCurrentPage(currentPage + 1);
    }
    // eslint-disable-next-line
  }, [totalPage]);

  useEffect(() => {
    if (searchData !== null && searchData !== undefined) {
      const dataProduct = JSON.parse(window.decodeURIComponent(searchData));
      setRecords(dataProduct);
    }
  }, [searchData]);

  useEffect(() => {
    getProducts(currentPage);
    getTotalPages();
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    service
      .getAllProductsSearch()
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getProducts = (pageNumber) => {
    setIsLoading(true);
    service
      .getAllProducts(pageNumber)
      .then((response) => {
        // const totalPages = Math.ceil(response.data.length / 5); // Thay ITEMS_PER_PAGE bằng số lượng sản phẩm trên mỗi trang của bạn
        // setCurrentPage(pageNumber > totalPages ? totalPages : pageNumber); // Kiểm tra và cập nhật currentPage
        setProducts(response.data);
        setRecords(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showDeleteSuccess = () => {
    Swal.fire({
      title: "Thông Báo",
      text: "Xóa Sản Phẩm Thành Công",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const deleteProduct = (productId) => {
    service
      .deleteProductById(productId)
      .then((response) => {
        showDeleteSuccess();
        getProducts(currentPage);
        getTotalPages();
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
            <Pagination.Item
              key={i}
              active={i + 1 === currentPage}
              onClick={(e) => {
                setCurrentPage(i + 1);
                console.log(currentPage);
              }}
              style={{ cursor: "pointer" }}
            >
              {i + 1}
            </Pagination.Item>
          ))}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Header emailUser={emailUser} title={"Product"} role={roles} />
      <Container fluid="md">
        <SearchForm />
        <div className="shadow p-3 mb-5 bg-white rounded mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/add-product" className="btn btn-primary mb-2">
              Add Product
            </Link>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              <i className="fa fa-refresh"></i> Reset
            </Button>
          </div>
          {renderSearchName()}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <DataTable columns={columns} data={records} />
          )}
          <Pagination className="d-flex justify-content-center">
            {currentPage === 1 ? !showPrevious() : showPrevious()}
            {renderButtonPage()}
            {currentPage >= totalPage ? !showNext() : showNext()}
          </Pagination>
        </div>
      </Container>
    </Fragment>
  );
};

export default TableProduct;
