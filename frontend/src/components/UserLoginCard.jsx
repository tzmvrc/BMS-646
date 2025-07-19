import { useState, useRef, useEffect } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Calendar,
  MapPin,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  Mail,
  ArrowLeft,
} from "lucide-react";
import "../../src/CardFlip.css";

// Sample account data
const sampleAccounts = [
  {
    email: "pending@example.com",
    password: "pending123",
    status: "pending",
    firstName: "John",
    lastName: "Doe",
    phone: "09123456789",
    reasons: [],
  },
  {
    email: "rejected@example.com",
    password: "rejected123",
    status: "rejected",
    firstName: "Jane",
    lastName: "Smith",
    phone: "09876543210",
    reasons: [
      "ID photo is unclear or unreadable",
      "Information doesn't match your ID",
      "Incomplete personal details",
    ],
  },
  {
    email: "approved@example.com",
    password: "approved123",
    status: "approved",
    firstName: "Alex",
    lastName: "Johnson",
    phone: "09123456788",
    reasons: [],
  },
];

const UserLoginCard = () => {
  // Login form state
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [isStatusFlipped, setIsStatusFlipped] = useState(false);
  const [accountStatus, setAccountStatus] = useState("");
  const [rejectionReasons, setRejectionReasons] = useState([]);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Signup form state
  const [step, setStep] = useState(1);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [idImage, setIdImage] = useState(null);
  const [idPreview, setIdPreview] = useState("");
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthdate: "",
    address: "",
    gender: "",
    otp: "",
    email: "",
  });

  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showConfirmPasswordField, setShowConfirmPasswordField] =
    useState(false);

  // Load remembered credentials from localStorage on component mount
  useEffect(() => {
    const rememberedPhone = localStorage.getItem("rememberedPhone");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedPhone && rememberedPassword) {
      setPhone(rememberedPhone);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { phone, password });

    // Save credentials if remember me is checked
    if (rememberMe) {
      localStorage.setItem("rememberedPhone", phone);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedPhone");
      localStorage.removeItem("rememberedPassword");
    }

    // Check if the credentials match any sample account
    const matchedAccount = sampleAccounts.find(
      (account) => account.phone === phone && account.password === password
    );

    if (matchedAccount) {
      setAccountStatus(matchedAccount.status);
      if (matchedAccount.status === "rejected") {
        setRejectionReasons(matchedAccount.reasons);
      }
      setShowStatus(true);
      setTimeout(() => {
        setIsStatusFlipped(true);
      }, 50);
    } else {
      alert("Invalid phone number or password");
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setIsResettingPassword(true);

    // Simulate API call to send reset password SMS
    setTimeout(() => {
      setForgotPasswordMessage(
        `If an account exists with ${phone}, you will receive a password reset link shortly.`
      );
      setIsResettingPassword(false);

      // Reset the form after 5 seconds
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordMessage("");
      }, 5000);
    }, 1500);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (step === 1 && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (step === 3 && !formData.otp) {
      alert("Please enter the OTP");
      return;
    }

    if (step === 4 && !idImage) {
      alert("Please upload your ID image");
      return;
    }

    if (step < 4) {
      if (step === 2) {
        handleSendOtp();
      }
      setStep(step + 1);
    } else {
      console.log("Complete signup data:", {
        ...formData,
        idImage: idImage.name,
      });
      setAccountStatus("pending");
      setShowStatus(true);
      setTimeout(() => {
        setIsStatusFlipped(true);
      }, 50);
    }
  };

  const handleSendOtp = () => {
    console.log("OTP sent to:", formData.phone);
    setOtpCountdown(60);

    const timer = setInterval(() => {
      setOtpCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setIdImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordFieldVisibility = () => {
    setShowPasswordField(!showPasswordField);
  };

  const toggleConfirmPasswordFieldVisibility = () => {
    setShowConfirmPasswordField(!showConfirmPasswordField);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleApplyAgain = () => {
    setIsStatusFlipped(false);
    setTimeout(() => {
      setShowStatus(false);
      setIsFlipped(true);
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        phone: "",
        birthdate: "",
        address: "",
        gender: "",
        otp: "",
        email: "",
      });
      setIdImage(null);
      setIdPreview("");
    }, 300);
  };

  const handleReturnToLogin = () => {
    setIsStatusFlipped(false);
    setTimeout(() => {
      setShowStatus(false);
      setIsFlipped(false);
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        phone: "",
        birthdate: "",
        address: "",
        gender: "",
        otp: "",
        email: "",
      });
      setIdImage(null);
      setIdPreview("");
    }, 300);
  };

  const renderSignupStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="mb-4 space-y-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-black">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full caret-black outline-none text-sm sm:text-base"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-black">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full caret-black outline-none text-sm sm:text-base"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-black">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="tel"
                name="phone"
                placeholder="Contact Number"
                className="w-full caret-black outline-none text-sm sm:text-base"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-black">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type={showPasswordField ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full caret-black outline-none text-sm sm:text-base"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordFieldVisibility}
                className="text-gray-400 focus:outline-none"
              >
                {showPasswordField ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-black">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type={showConfirmPasswordField ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full caret-black outline-none text-sm sm:text-base"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordFieldVisibility}
                className="text-gray-400 focus:outline-none"
              >
                {showConfirmPasswordField ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="mb-4 space-y-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 relative focus-within:border-black">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="date"
                name="birthdate"
                className={`w-full caret-black outline-none text-sm sm:text-base ${
                  !formData.birthdate ? "text-transparent" : "text-gray-500"
                }`}
                value={formData.birthdate}
                onChange={handleInputChange}
                required
              />
              {!formData.birthdate && (
                <span className="absolute left-10 text-gray-400 pointer-events-none">
                  Birthdate
                </span>
              )}
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-black">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full caret-black outline-none text-sm sm:text-base text-gray-500"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-black">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <select
                name="gender"
                className="w-full caret-black outline-none text-sm sm:text-base text-gray-500 bg-white"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled className="text-gray-400">
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="mb-4 space-y-4">
            <p className="text-sm text-gray-500 text-center mb-4">
              We've sent a verification code to {formData.phone}
            </p>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-black">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="w-full caret-black outline-none text-sm sm:text-base"
                value={formData.otp}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="text-center">
              {otpCountdown > 0 ? (
                <p className="text-xs text-gray-500">
                  Resend OTP in {otpCountdown} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-xs text-blue-500 hover:text-blue-700"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="mb-4 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Please upload a clear photo of your government-issued ID
              </p>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              <div
                onClick={triggerFileInput}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {idPreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={idPreview}
                      alt="ID Preview"
                      className="h-40 object-contain border rounded-md"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIdImage(null);
                        setIdPreview("");
                      }}
                      className="text-xs text-red-500 mt-2 hover:text-red-700"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload ID photo
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      (JPEG, PNG, max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="scene">
      <div
        className={`card ${isFlipped ? "is-flipped" : ""} ${
          showStatus ? "status-mode" : ""
        }`}
      >
        {/* Front Face - Login Form */}
        {!showStatus && !showForgotPassword && (
          <div className="card__face card__face--front">
            <div className="bg-white rounded-lg p-6 sm:p-8 w-full h-full flex flex-col">
              <div className="flex justify-center mb-4">
                <img
                  src="/BrgyLogo.png"
                  alt="BMS646 Logo"
                  className="h-10 sm:h-12"
                />
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">
                Sign in to continue
              </h2>
              <p className="text-sm sm:text-base text-gray-500 text-center mb-7">
                Please sign in to start your session
              </p>

              <form
                onSubmit={handleLoginSubmit}
                className="flex-grow flex flex-col"
              >
                <div className="mb-4">
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4 focus-within:border-black">
                    <Phone className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                      type="tel"
                      placeholder="Contact Number"
                      className="w-full caret-black outline-none text-sm sm:text-base"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-black">
                    <Lock className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full caret-black outline-none text-sm sm:text-base"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition-colors mb-4 text-sm sm:text-base"
                >
                  Sign in
                </button>
              </form>

              <div className="text-center mt-auto">
                <p className="text-sm text-gray-600">Don't have an account? </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(true);
                    setStep(1);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      password: "",
                      confirmPassword: "",
                      phone: "",
                      birthdate: "",
                      address: "",
                      gender: "",
                      otp: "",
                      email: "",
                    });
                    setIdImage(null);
                    setIdPreview("");
                  }}
                  className="text-xs mt-2 text-gray-500 hover:text-gray-700"
                >
                  Signup Here
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Forgot Password Form */}
        {showForgotPassword && (
          <div className="card__face card__face--front">
            <div className="bg-white rounded-lg p-6 sm:p-8 w-full h-full flex flex-col">
              <div className="flex justify-center mb-4">
                <img
                  src="/BrgyLogo.png"
                  alt="BMS646 Logo"
                  className="h-10 sm:h-12"
                />
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">
                Forgot Password
              </h2>
              <p className="text-sm sm:text-base text-gray-500 text-center mb-7">
                Enter your phone number to reset your password
              </p>

              <form
                onSubmit={handleForgotPasswordSubmit}
                className="flex-grow flex flex-col"
              >
                <div className="mb-8">
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4 focus-within:border-black">
                    <Phone className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full caret-black outline-none text-sm sm:text-base"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  {forgotPasswordMessage && (
                    <div className="text-sm text-green-600 mb-4 text-center">
                      {forgotPasswordMessage}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotPasswordMessage("");
                  }}
                  className=" items-center justify-center flex text-sm text-gray-600 hover:text-gray-900 mb-2 "
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Login
                </button>

                <button
                  type="submit"
                  disabled={isResettingPassword}
                  className={`w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition-colors mb-4 text-sm sm:text-base ${
                    isResettingPassword ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isResettingPassword ? "Sending..." : "Reset Password"}
                </button>
              </form>

              <div className="text-center mt-auto pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setIsFlipped(true);
                      setStep(1);
                    }}
                    className="text-gray-900 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back Face - Multi-step Signup Form */}
        {!showStatus && !showForgotPassword && (
          <div className="card__face card__face--back">
            <div className="bg-white rounded-lg p-6 sm:p-8 w-full h-full flex flex-col">
              <div className="flex justify-center mb-4">
                <img
                  src="/BrgyLogo.png"
                  alt="BMS646 Logo"
                  className="h-10 sm:h-12"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">
                Create Account
              </h2>
              <p className="text-sm sm:text-base text-gray-500 text-center mb-6">
                {step === 1 && "Basic Information"}
                {step === 2 && "Additional Information"}
                {step === 3 && "Verify Your Phone"}
                {step === 4 && "ID Verification"}
              </p>

              <form
                onSubmit={handleSignupSubmit}
                className="flex-grow flex flex-col"
              >
                {renderSignupStep()}

                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="text-xs text-gray-500 hover:text-gray-700 mb-2"
                  >
                    ← Back
                  </button>
                )}

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition-colors mb-4 text-sm sm:text-base mt-auto"
                >
                  {step === 1
                    ? "Next"
                    : step === 2
                    ? "Send OTP"
                    : step === 3
                    ? "Verify Account"
                    : "Complete Registration"}
                </button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                </p>
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="text-xs mt-2 text-gray-500 hover:text-gray-700"
                >
                  Sign in Here
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Card Face */}
        {showStatus && (
          <div
            className={`card__face card__face--status ${
              isStatusFlipped ? "is-flipped" : ""
            }`}
          >
            {accountStatus === "pending" ? (
              <div className="status-card bg-white rounded-lg p-8 w-full h-full flex flex-col">
                <div className="text-center flex-grow">
                  <Clock className="w-16 h-16 text-yellow-600 mx-auto my-8" />
                  <h2 className="text-2xl font-semibold mb-2">
                    Registration Complete!
                  </h2>
                  <div className="flex items-center justify-center text-yellow-600 mb-4">
                    <Clock className="w-5 h-5 mr-2" />
                    <p className="font-medium">Pending Account Verification</p>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Your account is under review. Please wait for 3 business
                    days for verification.
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    We'll send you a notification message once your account has
                    been validated.
                  </p>
                </div>
                <button
                  onClick={handleReturnToLogin}
                  className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition-colors"
                >
                  Return to Login
                </button>
              </div>
            ) : accountStatus === "rejected" ? (
              <div className="status-card bg-white rounded-lg p-8 w-full h-full flex flex-col">
                <div className="text-center flex-grow">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto my-2" />
                  <h2 className="text-2xl font-semibold mb-2">
                    Account Rejected
                  </h2>
                  <div className="flex items-center justify-center text-red-600 mb-4">
                    <p className="font-medium">
                      Sorry, your account has been rejected
                    </p>
                  </div>
                  {rejectionReasons.length > 0 && (
                    <div className="text-left bg-red-50 p-4 rounded-md mb-6">
                      <p className="text-red-600 font-medium mb-2">Reasons:</p>
                      <ul className="list-disc list-inside text-red-500 text-sm space-y-1">
                        {rejectionReasons.map((reason, index) => (
                          <li key={index}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-gray-500 text-sm mb-6">
                    You can apply again with corrected information.
                  </p>
                </div>
                <button
                  onClick={handleApplyAgain}
                  className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition-colors"
                >
                  Apply Again
                </button>
              </div>
            ) : accountStatus === "approved" ? (
              <div className="status-card bg-white rounded-lg p-8 w-full h-full flex flex-col">
                <div className="text-center flex-grow">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto my-8" />
                  <h2 className="text-2xl font-semibold mb-2">
                    Account Approved
                  </h2>
                  <div className="flex items-center justify-center text-green-600 mb-4">
                    <p className="font-medium">
                      Your account has been approved!
                    </p>
                  </div>
                  <p className="text-gray-600 mb-6">
                    You can now access all features of the Barangay Management
                    System.
                  </p>
                </div>
                <button
                  onClick={handleReturnToLogin}
                  className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition-colors"
                >
                  Continue to Dashboard
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLoginCard;
