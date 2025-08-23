import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Auth.css";

function SellerLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { loginSeller } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear individual field error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form before submit
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await loginSeller(formData);
      navigate("/seller/dashboard"); // Redirect on success
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form:
          err?.response?.data?.message ||
          err?.message ||
          "Login failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container seller-auth">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1>Seller Login</h1>
          <p>Access your seller account to manage products and orders</p>
        </div>

        {/* General error */}
        {errors.form && <div className="auth-error-message">{errors.form}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <div id="email-error" className="error-text">
                {errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <div id="password-error" className="error-text">
                {errors.password}
              </div>
            )}
          </div>

          {/* Remember & Forgot */}
          <div className="form-group remember-forgot">
            <label className="remember-me">
              <input type="checkbox" id="remember" name="remember" />
              Remember me
            </label>
            <Link to="/seller/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="auth-button seller-auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            Don’t have a seller account?{" "}
            <Link to="/seller/signup" className="auth-redirect-link">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Info */}
        <div className="auth-info">
          <p>
            Need help? Contact seller support at{" "}
            <a href="mailto:seller-support@example.com">
              seller-support@example.com
            </a>
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="auth-benefits">
        <h2>Why Sell With Us?</h2>
        <ul>
          <li>
            <span className="benefit-icon">💰</span>
            <span className="benefit-text">Access to millions of customers</span>
          </li>
          <li>
            <span className="benefit-icon">🚚</span>
            <span className="benefit-text">
              Easy shipping and fulfillment options
            </span>
          </li>
          <li>
            <span className="benefit-icon">📊</span>
            <span className="benefit-text">
              Powerful analytics and reporting
            </span>
          </li>
          <li>
            <span className="benefit-icon">💻</span>
            <span className="benefit-text">
              User-friendly seller dashboard
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SellerLogin;
