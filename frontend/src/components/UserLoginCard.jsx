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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    birthdate: "",
    address: "",
    gender: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Signup data:", formData);
      // Submit logic here
    }
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
            <p className="text-sm sm:text-base text-gray-500 text-center mb-20">
              Please sign in to start your session
            </p>

            <form
              onSubmit={handleLoginSubmit}
              className="flex-grow flex flex-col"
            >
              <div className="mb-8"> {/* Increased margin bottom */}
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
                onClick={() => setIsFlipped(true)}
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
              Please sign up to start your session
            </p>

            <form
              onSubmit={handleSignupSubmit}
              className="flex-grow flex flex-col"
            >
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
                    placeholder="Re-enter Password"
                    className="w-full outline-none text-sm sm:text-base"
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
                className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition-colors mb-4 text-sm sm:text-base mt-auto"
              >
                Next
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