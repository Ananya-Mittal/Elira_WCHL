import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useNavigate } from "react-router-dom";
import "./SellerSignup.css";

const SellerSignup = () => {
  const { registerSeller } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    storeName: "",
    referral: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handlePasswordChange = (value) => {
    setFormData({ ...formData, password: value });

    // Simple password strength check
    if (value.length < 6) setPasswordStrength("Weak");
    else if (value.length < 10) setPasswordStrength("Moderate");
    else setPasswordStrength("Strong");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terms) {
      alert("Please accept terms & conditions.");
      return;
    }
    console.log("Seller registered:", formData);
    // Call your context registration function here
    // await registerSeller(formData);
    navigate("/seller/dashboard");
  };

  return (
    <div className="seller-signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Seller Account</h2>
        <p className="signup-subtitle">
          Join thousands of sellers on Elira and start selling your products today.
        </p>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Store Name"
            value={formData.storeName}
            onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
            required
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {formData.password && (
            <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
              Password Strength: {passwordStrength}
            </div>
          )}
          <input
            type="text"
            placeholder="Referral Code (Optional)"
            value={formData.referral}
            onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
          />
          <label className="terms-label">
            <input
              type="checkbox"
              checked={formData.terms}
              onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
            />
            I agree to the <a href="#terms">Terms & Conditions</a>
          </label>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/seller/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SellerSignup;
