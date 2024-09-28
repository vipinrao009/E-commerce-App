import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth.js";
import { toast } from "react-hot-toast";
import SearchInput from "../../components/Form/SearchInput.js";
import useCategory from "../../hook/useCategory.js";
import { useCart } from "../../Context/cart.js";
import { Badge } from "antd";
import { useSearch } from "../../Context/search.js";
import axios from "axios";
import { baseUrl } from "../BaseUrl.js";

const HeaderMobile = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const categories = useCategory();
  const [cart] = useCart();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [values, setValues] = useSearch();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        const {data} = await axios.get(`${baseUrl}/api/v1/product/product-search/${values.keyword}`);
        if(data?.success){
            setValues({...values, result:data})
        }
        navigate("/search")
    } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching search input");
    }
}

  const handleLogout = async () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    await toast.success("Logout successfully...");
    navigate("/");
  };

  const profileDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-primary">
          ShopEase
        </Link>

        <form className="d-flex " style={{ width: "30%" }} role="search" onSubmit={handleSubmit}>
            <input
                className="form-control me-2 w-33"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={values.keyword}
                onChange={(e)=>setValues({...values, keyword: e.target.value})}
            />
            <button className="btn btn-outline-success" type="submit">
            <i class="bi bi-search"></i>
            </button>
        </form>

        {/* Cart and Profile */}
        <div className="d-flex align-items-center ms-3">
          <Badge count={cart?.length} showZero offset={[4, 3]} className="me-3">
            <NavLink to="/cart" className="nav-link position-relative">
              <i className="bi bi-cart-fill fs-4"></i>
            </NavLink>
          </Badge>

          <i
            onClick={profileDropdown}
            className="bi bi-person-circle fs-4"
            style={{ cursor: "pointer" }}
          ></i>

          {isDropdownVisible && (
            <div className="dropdown-menu show mt-2 p-2 shadow" style={{ position: "absolute", top: "100%", right: 0 }}>
              <Link className="dropdown-item" to={"/dashboard/user/profile"}>
                Profile
              </Link>
              <hr className="dropdown-divider" />
              <Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                Dashboard
              </Link>
              <hr className="dropdown-divider" />
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                LOG OUT
              </button>
            </div>
          )}
        </div>

        <button
          className="navbar-toggler ms-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileNavbar"
          aria-controls="mobileNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobileNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/categories" data-bs-toggle="dropdown">
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/categories">
                    All Categories
                  </Link>
                </li>
                {categories?.map((category) => (
                  <li key={category._id}>
                    <Link className="dropdown-item" to={`/category/${category.slug}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* Search Input */}
        <div className="d-none d-lg-block ms-3">
          <SearchInput />
        </div>
      </div>
    </nav>
  );
};

export default HeaderMobile;
