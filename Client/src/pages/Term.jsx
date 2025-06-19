import { Link } from "react-router-dom";
import bgImage from "../assets/bg-pattern.jpg";

export default function Terms() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Terms and Conditions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 mb-8">
              Please read these terms and conditions carefully before using our service.
            </p>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <h3 className="text-xl font-semibold text-gray-800">1. Acceptance of Terms</h3>
            <p>
              By accessing and using this application, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>

            <h3 className="text-xl font-semibold text-gray-800">2. User Responsibilities</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.
            </p>

            <h3 className="text-xl font-semibold text-gray-800">3. Privacy Policy</h3>
            <p>
              Your use of the application is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.
            </p>

            <h3 className="text-xl font-semibold text-gray-800">4. Data Security</h3>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h3 className="text-xl font-semibold text-gray-800">5. Limitation of Liability</h3>
            <p>
              The application shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/signup"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span className="font-semibold">Back to Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
