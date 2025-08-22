import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GlobalContext } from "../../context/GlobalState";
import "./Auth.css";

// Step 1 validation schema
const step1Schema = yup.object().shape({
  businessName: yup.string().required("Business name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

// Step 2 validation schema
const step2Schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number")
    .required("Phone number is required"),
  businessType: yup.string().required("Business type is required"),
  acceptTerms: yup
    .bool()
    .oneOf([true], "You must accept the terms and conditions"),
});

function SellerSignup() {
  const { registerSeller } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Setup react-hook-form with schema depending on step
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    resolver: yupResolver(currentStep === 1 ? step1Schema : step2Schema),
    defaultValues: {
      businessName: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      businessType: "individual",
      acceptTerms: false,
    },
  });

  // Move to next step if validation passes
  const nextStep = async () => {
    const valid = await trigger(["businessName", "email", "password", "confirmPassword"]);
    if (valid) setCurrentStep(2);
  };

  const prevStep = () => setCurrentStep(1);

  // Final submit
  const onSubmit = async (data) => {
    if (currentStep === 1) {
      nextStep();
      return;
    }

    setIsLoading(true);
    try {
      await registerSeller(data);
      navigate("/seller/verification");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container seller-auth">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <h1>Become a Seller</h1>
          <p>Start selling your products to millions of customers</p>

          <div className="step-indicator">
            <div className={`step ${currentStep === 1 ? "active" : ""}`}>
              <span className="step-number">1</span>
              <span className="step-name">Account</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep === 2 ? "active" : ""}`}>
              <span className="step-number">2</span>
              <span className="step-name">Details</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {currentStep === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="businessName">Business/Store Name</label>
                <input
                  type="text"
                  id="businessName"
                  {...register("businessName")}
                  className={errors.businessName ? "input-error" : ""}
                />
                {errors.businessName && <div className="error-text">{errors.businessName.message}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <div className="error-text">{errors.email.message}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className={errors.password ? "input-error" : ""}
                />
                {errors.password && <div className="error-text">{errors.password.message}</div>}
                <div className="password-requirements">Password must be at least 8 characters</div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  className={errors.confirmPassword ? "input-error" : ""}
                />
                {errors.confirmPassword && <div className="error-text">{errors.confirmPassword.message}</div>}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className={errors.firstName ? "input-error" : ""}
                  />
                  {errors.firstName && <div className="error-text">{errors.firstName.message}</div>}
                </div>

                <div className="form-group half">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className={errors.lastName ? "input-error" : ""}
                  />
                  {errors.lastName && <div className="error-text">{errors.lastName.message}</div>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="(xxx) xxx-xxxx"
                  {...register("phone")}
                  className={errors.phone ? "input-error" : ""}
                />
                {errors.phone && <div className="error-text">{errors.phone.message}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="businessType">Business Type</label>
                <select id="businessType" {...register("businessType")}>
                  <option value="individual">Individual/Sole Proprietor</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  {...register("acceptTerms")}
                  className={errors.acceptTerms ? "checkbox-error" : ""}
                />
                <label htmlFor="acceptTerms">
                  I agree to the <Link to="/terms">Terms and Conditions</Link> and{" "}
                  <Link to="/privacy">Privacy Policy</Link>
                </label>
                {errors.acceptTerms && <div className="error-text">{errors.acceptTerms.message}</div>}
              </div>
            </>
          )}

          <div className="auth-button-group">
            {currentStep === 2 && (
              <button type="button" className="auth-button secondary" onClick={prevStep}>
                Back
              </button>
            )}

            <button
              type="submit"
              className="auth-button seller-auth-button"
              disabled={isLoading}
            >
              {currentStep === 1
                ? "Next"
                : isLoading
                ? "Creating Account..."
                : "Create Seller Account"}
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <p>
            Already have a seller account?{" "}
            <Link to="/seller/login" className="auth-redirect-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="auth-benefits">
        <h2>Seller Benefits</h2>
        <ul>
          <li>🌐 Expand your business online</li>
          <li>📱 Manage your store anywhere, anytime</li>
          <li>💳 Secure payment processing</li>
          <li>📈 Growth tools and marketing support</li>
        </ul>

        <div className="seller-testimonial">
          <blockquote>
            "Joining as a seller was the best business decision I made. Sales increased by 200% in just 3 months!"
          </blockquote>
          <cite>— Sarah K., Fashion Boutique Owner</cite>
        </div>
      </div>
    </div>
  );
}

export default SellerSignup;
