import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../context/GlobalState";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { cart, user, isAuthenticated, logout } = useContext(GlobalContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const location = useLocation();

  const { t, i18n } = useTranslation();

  // Detect seller portal
  useEffect(() => {
    setIsSeller(location.pathname.includes("/seller"));
  }, [location]);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);
  const closeDropdown = () => setShowDropdown(false);

  const handleLogout = () => {
    logout();
    closeDropdown();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".user-profile")) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  // Load saved language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <nav className={`navbar ${isSeller ? "seller-navbar" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">ELIRA</span>
          {isSeller && <span className="seller-badge">{t("sellerPortal")}</span>}
        </Link>

        {/* Links */}
        <div className={`navbar-links ${showMobileMenu ? "active" : ""}`}>
          {!isSeller ? (
            <>
              {/* Language Selector */}
              <div className="nav-item dropdown">
                <button className="nav-link dropdown-toggle">
                  <i className="fas fa-globe"></i>
                  <span>{t("language")}</span>
                </button>
                <div className="dropdown-menu">
                  <button onClick={() => changeLanguage("en")} className="dropdown-item">
                    English
                  </button>
                  <button onClick={() => changeLanguage("hi")} className="dropdown-item">
                    हिंदी
                  </button>
                  <button onClick={() => changeLanguage("kn")} className="dropdown-item">
                    ಕನ್ನಡ
                  </button>
                  <button onClick={() => changeLanguage("mr")} className="dropdown-item">
                    मराठी
                  </button>
                  <button onClick={() => changeLanguage("gu")} className="dropdown-item">
                    ગુજરાતી
                  </button>
                  <button onClick={() => changeLanguage("te")} className="dropdown-item">
                    తెలుగు
                  </button>
                </div>
              </div>

              {/* Wishlist */}
              <div className="nav-item">
                <Link to="/wishlist" className="nav-link">
                  <i className="fas fa-heart"></i>
                  <span>{t("wishlist")}</span>
                </Link>
              </div>

              {/* Digital Learning */}
              <div className="nav-item">
                <Link to="/digitalLearning" className="nav-link">
                  <i className="fas fa-book-reader"></i>
                  <span>{t("digitalLearning")}</span>
                </Link>
              </div>

              {/* Get App */}
              <div className="nav-item">
                <Link to="/app" className="nav-link">
                  <i className="fas fa-mobile-alt"></i>
                  <span>{t("getApp")}</span>
                </Link>
              </div>

              {/* Cart */}
              <div className="nav-item">
                <Link to="/cart" className="nav-link cart-link">
                  <i className="fas fa-shopping-cart"></i>
                  <span>{t("cart")} ({cart.length})</span>
                  {cart.length > 0 && <span className="cart-notification" />}
                </Link>
              </div>

              {/* Orders */}
              <div className="nav-item">
                <Link to="/orders" className="nav-link">
                  <i className="fas fa-box"></i>
                  <span>{t("orders")}</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Seller Links */}
              <div className="nav-item">
                <Link to="/seller/dashboard" className="nav-link">
                  <i className="fas fa-tachometer-alt"></i>
                  <span>{t("dashboard")}</span>
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/seller/products" className="nav-link">
                  <i className="fas fa-box-open"></i>
                  <span>{t("products")}</span>
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/seller/orders" className="nav-link">
                  <i className="fas fa-shopping-bag"></i>
                  <span>{t("orders")}</span>
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/seller/analytics" className="nav-link">
                  <i className="fas fa-chart-line"></i>
                  <span>{t("analytics")}</span>
                </Link>
              </div>
            </>
          )}

          {/* User Profile */}
          <div className="nav-item user-profile" onClick={toggleDropdown}>
            <button className="nav-link profile-toggle">
              <i className="fas fa-user-circle"></i>
              <span>
                {isAuthenticated ? `${t("hi")}, ${user?.firstName || "User"}` : t("account")}
              </span>
            </button>

            {showDropdown && (
              <div className="profile-dropdown">
                {isAuthenticated ? (
                  <>
                    <div className="dropdown-user-info">
                      <i className="fas fa-user-circle dropdown-user-icon"></i>
                      <div className="dropdown-user-details">
                        <span className="dropdown-user-name">
                          {user?.firstName} {user?.lastName}
                        </span>
                        <span className="dropdown-user-email">{user?.email}</span>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <Link to="/profile" className="dropdown-item" onClick={closeDropdown}>
                      <i className="fas fa-user"></i> {t("myProfile")}
                    </Link>
                    <Link to="/orders" className="dropdown-item" onClick={closeDropdown}>
                      <i className="fas fa-box"></i> {t("myOrders")}
                    </Link>
                    {!isSeller ? (
                      <Link to="/seller/login" className="dropdown-item" onClick={closeDropdown}>
                        <i className="fas fa-store"></i> {t("sellerPortal")}
                      </Link>
                    ) : (
                      <Link to="/" className="dropdown-item" onClick={closeDropdown}>
                        <i className="fas fa-shopping-bag"></i> {t("customerView")}
                      </Link>
                    )}
                    <div className="dropdown-divider" />
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i> {t("logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="dropdown-header">{t("welcome")}</div>
                    <div className="auth-buttons">
                      <Link to="/login" className="dropdown-auth-btn login-btn" onClick={closeDropdown}>
                        {t("login")}
                      </Link>
                      <Link to="/signup" className="dropdown-auth-btn signup-btn" onClick={closeDropdown}>
                        {t("signup")}
                      </Link>
                    </div>
                    <div className="dropdown-divider" />
                    <Link to="/orders" className="dropdown-item" onClick={closeDropdown}>
                      <i className="fas fa-box"></i> {t("trackOrder")}
                    </Link>
                    <Link to="/help" className="dropdown-item" onClick={closeDropdown}>
                      <i className="fas fa-question-circle"></i> {t("help")}
                    </Link>
                    <div className="dropdown-divider" />
                    <div className="dropdown-seller-section">
                      <span className="dropdown-seller-title">{t("areYouSeller")}</span>
                      <div className="seller-auth-links">
                        <Link to="/seller/login" className="seller-link" onClick={closeDropdown}>
                          {t("sellerLogin")}
                        </Link>
                        <span className="seller-divider">|</span>
                        <Link to="/seller/signup" className="seller-link" onClick={closeDropdown}>
                          {t("becomeSeller")}
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
          <i className={`fas ${showMobileMenu ? "fa-times" : "fa-bars"}`} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
