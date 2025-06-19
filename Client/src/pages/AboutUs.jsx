import { useState, useEffect } from 'react';

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigateHome = () => {
    // For React Router, replace with: navigate('/') or history.push('/')
    // For Next.js, replace with: router.push('/')
    window.location.href = '/'; // Simple redirect - replace with your routing method
  };

  const handleViewDocumentation = () => {
    setShowDocumentation(true);
  };

  const handleCloseDocumentation = () => {
    setShowDocumentation(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className={`transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-lg mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Us
            </h1>
            <div className="w-16 h-1 bg-gray-800 mx-auto"></div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 mb-12">
            <div className="space-y-12">
              
              {/* Welcome Section */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-gray-600 rounded-full mt-4"></div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Welcome to Finance Tracker
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Your smart companion to manage, track, and visualize your income and expenses effortlessly.
                    We believe that financial wellness should be accessible, intuitive, and empowering for everyone.
                  </p>
                </div>
              </div>

              {/* Mission Section */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-gray-600 rounded-full mt-4"></div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Our Mission
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    We're on a mission to help you take control of your finances with ease and confidence.
                    Whether you're budgeting for daily expenses, planning major purchases, or building your savings,
                    Finance Tracker adapts to your unique financial journey.
                  </p>
                </div>
              </div>

              {/* Built with Passion Section */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-gray-600 rounded-full mt-4"></div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Built with Passion
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Created with love, attention to detail, and countless cups of coffee ☕.
                    We understand the challenges of financial management because we've been there too.
                    Every feature is designed with your success and peace of mind in mind.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12 text-center">
              <button 
                onClick={handleNavigateHome}
                className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                <span>Start Your Financial Journey</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simple</h3>
              <p className="text-gray-600">Easy to use interface designed for everyone</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart</h3>
              <p className="text-gray-600">Intelligent insights to improve your finances</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600">Your financial data protected and private</p>
            </div>
          </div>

          {/* Contact/Support Section */}
          <div className="mt-16 bg-white border border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Need Help Getting Started?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our team is here to support you on your financial journey. Whether you have questions about features 
              or need guidance on best practices, we're just a message away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleViewDocumentation}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                View Documentation
              </button>
              <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Modal */}
      {showDocumentation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Finance Tracker Documentation</h2>
              <button 
                onClick={handleCloseDocumentation}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Getting Started */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🚀 Getting Started</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>1. Add Your First Transaction:</strong> Click "Add Transaction" on the home page to record your income or expenses.</p>
                  <p><strong>2. Choose Transaction Type:</strong> Select either "Income" for money coming in or "Expense" for money going out.</p>
                  <p><strong>3. Fill Details:</strong> Add a description, category, amount, and date for your transaction.</p>
                  <p><strong>4. Save:</strong> Click "Add Transaction" to save your entry to the system.</p>
                </div>
              </section>

              {/* Features Overview */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">📊 Dashboard Overview</h4>
                    <p className="text-gray-700 text-sm">View your total income, expenses, and net balance at a glance.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">📈 Visual Charts</h4>
                    <p className="text-gray-700 text-sm">Analyze spending patterns with interactive expense and income charts.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">📋 Transaction Management</h4>
                    <p className="text-gray-700 text-sm">Add, edit, and delete transactions with ease.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">📤 Data Export</h4>
                    <p className="text-gray-700 text-sm">Export your transaction data as CSV files for external analysis.</p>
                  </div>
                </div>
              </section>

              {/* Transaction Categories */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🏷️ Transaction Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Income Categories</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Salary</li>
                      <li>• Freelance</li>
                      <li>• Investment Returns</li>
                      <li>• Business Income</li>
                      <li>• Other Income</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Expense Categories</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Food & Dining</li>
                      <li>• Transportation</li>
                      <li>• Shopping</li>
                      <li>• Entertainment</li>
                      <li>• Bills & Utilities</li>
                      <li>• Healthcare</li>
                      <li>• Education</li>
                      <li>• Other Expenses</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Tips & Best Practices */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Tips & Best Practices</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Regular Updates:</strong> Record transactions daily or weekly for accurate tracking.</p>
                  <p><strong>Detailed Descriptions:</strong> Use clear, descriptive names for easy identification later.</p>
                  <p><strong>Category Consistency:</strong> Use the same categories consistently for better analysis.</p>
                  <p><strong>Review Monthly:</strong> Check your reports monthly to understand spending patterns.</p>
                  <p><strong>Export Regularly:</strong> Back up your data by exporting it periodically.</p>
                </div>
              </section>

              {/* Troubleshooting */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🔧 Common Issues</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Q: My charts aren't showing data</strong><br/>
                  A: Make sure you have added transactions. Charts require at least one transaction to display data.</p>
                  <p><strong>Q: Can I edit a transaction after saving?</strong><br/>
                  A: Yes! Click the "Edit" button next to any transaction in the transaction list or reports page.</p>
                  <p><strong>Q: How do I delete a transaction?</strong><br/>
                  A: Use the "Delete" button next to the transaction in the reports page. Confirm the deletion when prompted.</p>
                  <p><strong>Q: Export not working?</strong><br/>
                  A: Ensure you have transactions to export and that your browser allows downloads.</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};