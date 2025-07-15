import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Camera,
  Calendar,
  MapPin,
} from "lucide-react";
import "../../src/CardFlip.css";

const UserLoginCard = () => {
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Signup form state
  const [step, setStep] = useState(1);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
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
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Validate password match on step 1
    if (step === 1 && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (step < 3) {
      if (step === 2 && !isOtpSent) {
        handleSendOtp();
        return;
      }
      setStep(step + 1);
    } else {
      console.log("Signup data:", formData);
      // Submit logic here
      alert("Registration successful!");
      setIsFlipped(false); // Flip back to login after successful registration
    }
  };

  const handleSendOtp = () => {
    // In a real app, you would send the OTP to the user's phone/email here
    console.log("OTP sent to:", formData.phone);
    setIsOtpSent(true);
    setOtpCountdown(60); // 60 seconds countdown

    // Start countdown timer
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderSignupStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="mb-4 space-y-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full outline-none text-sm sm:text-base"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full outline-none text-sm sm:text-base"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="tel"
                name="phone"
                placeholder="Contact Number"
                className="w-full outline-none text-sm sm:text-base"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full outline-none text-sm sm:text-base"
                value={formData.password}
                onChange={handleInputChange}
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

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full outline-none text-sm sm:text-base"
                value={formData.confirmPassword}
                onChange={handleInputChange}
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
        );
      case 2:
        return (
          <div className="mb-4 space-y-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 relative">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="date"
                name="birthdate"
                placeholder=""
                className={`w-full outline-none text-sm sm:text-base ${
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
            
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full outline-none text-sm sm:text-base text-gray-500"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <select
                name="gender"
                className="w-full outline-none text-sm sm:text-base text-gray-500 bg-white"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled selected className="text-gray-400">
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

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="w-full outline-none text-sm sm:text-base"
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
      default:
        return null;
    }
  };

  return (
    <div className="scene">
      <div className={`card ${isFlipped ? "is-flipped" : ""}`}>
        {/* Front Face - Login Form */}
        <div className="card__face card__face--front">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full h-full flex flex-col">
            <div className="flex justify-center mb-4">
              <div className="flex items-center">
                <img
                  src="/BrgyLogo.png"
                  alt="BMS646 Logo"
                  className="h-10 sm:h-12"
                />
              </div>
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
              <div className="mb-8">
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4">
                  <Mail className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full outline-none text-sm sm:text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                  <Lock className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full outline-none text-sm sm:text-base"
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
                  setIsOtpSent(false);
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
                  });
                }}
                className="text-xs mt-2 text-gray-500 hover:text-gray-700"
              >
                Signup Here
              </button>
            </div>
          </div>
        </div>

        {/* Back Face - Multi-step Signup Form */}
        <div className="card__face card__face--back">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full h-full flex flex-col">
            <div className="flex justify-center mb-4">
              <div className="flex items-center">
                <img
                  src="/BrgyLogo.png"
                  alt="BMS646 Logo"
                  className="h-10 sm:h-12"
                />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">
              Create Account
            </h2>
            <p className="text-sm sm:text-base text-gray-500 text-center mb-6">
              {step === 1 && "Basic Information"}
              {step === 2 && "Additional Information"}
              {step === 3 && "Verify Your Phone"}
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
                {step === 3
                  ? "Verify Account"
                  : step === 2 && !isOtpSent
                  ? "Send OTP"
                  : "Next"}
              </button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">Already have an account? </p>
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="text-xs mt-2 text-gray-500 hover:text-gray-700"
              >
                Signin Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginCard;
