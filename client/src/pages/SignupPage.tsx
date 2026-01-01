import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, UserIcon, XIcon } from "lucide-react";

type ModalType = "terms" | "privacy" | null;

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [openModal, setOpenModal] = useState<ModalType>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        if (!agreedToTerms) {
            alert("Please agree to the terms and conditions");
            return;
        }

        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Here you would typically make an API call
        console.log("Signup:", formData);
        
        setIsLoading(false);
        // Navigate to login or dashboard after successful signup
        // navigate("/login");
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute top-10 right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-10 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [0, 40, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.6, 1],
                        rotate: [0, -180, -360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Left Side - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="mb-6">
                                <Link to="/" className="inline-flex items-center gap-3 hover:opacity-80 transition">
                                    <img src="/assets/logo_two.png" alt="Thumbly" className="w-12 h-12" />
                                    <span className="text-2xl font-bold text-white">thumbly</span>
                                </Link>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                            <p className="text-slate-400">Start creating amazing thumbnails today</p>
                        </div>

                        {/* Signup Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MailIcon className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockIcon className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-10 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockIcon className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-10 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOffIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start pt-2">
                                {/* <input
                                    id="terms"
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="w-4 h-4 mt-1 rounded border-slate-700 bg-slate-800 text-pink-500 focus:ring-pink-500 focus:ring-offset-0"
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-slate-400">
                                    I agree to the{" "}
                                    <button 
                                        type="button"
                                        onClick={() => setOpenModal("terms")}
                                        className="text-pink-500 hover:text-pink-400 transition"
                                    >
                                        Terms
                                    </button>{" "}
                                    and{" "}
                                    <button 
                                        type="button"
                                        onClick={() => setOpenModal("privacy")}
                                        className="text-pink-500 hover:text-pink-400 transition"
                                    >
                                        Privacy Policy
                                    </button>
                                </label> */}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="mt-5 mb-5">
                            {/* <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-slate-900/50 text-slate-500">Or sign up with</span>
                                </div>
                            </div> */}
                        </div>

                        {/* Social Signup */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-white text-sm transition"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-white text-sm transition"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                            </motion.button>
                        </div>

                        {/* Login Link */}
                        <p className="mt-5 text-center text-sm text-slate-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-pink-500 hover:text-pink-400 font-medium transition">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Minimal Content */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center px-12 py-12 relative">
                <motion.div
                    className="max-w-md text-center space-y-12"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* Simple Icon */}
                    <div className="text-8xl opacity-90">
                        ✨
                    </div>

                    {/* Main Message */}
                    <div className="space-y-6">
                        <h2 className="text-5xl font-bold text-white leading-tight">
                            Your creative journey starts
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"> now</span>
                        </h2>
                        <p className="text-lg text-slate-400">
                            AI-powered thumbnails that turn viewers into subscribers
                        </p>
                    </div>

                    {/* Simple Features */}
                    <div className="space-y-4 pt-8">
                        <div className="flex items-center gap-3 text-left">
                            <div className="text-2xl">⚡</div>
                            <div>
                                <div className="text-white font-medium">Lightning Fast</div>
                                <div className="text-sm text-slate-500">Generate in seconds</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-left">
                            <div className="text-2xl">🎯</div>
                            <div>
                                <div className="text-white font-medium">AI-Powered</div>
                                <div className="text-sm text-slate-500">Optimized for clicks</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-left">
                            <div className="text-2xl">🎨</div>
                            <div>
                                <div className="text-white font-medium">Customizable</div>
                                <div className="text-sm text-slate-500">Match your brand</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Terms & Privacy Modals */}
            <AnimatePresence>
                {openModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpenModal(null)}
                    >
                    <motion.div
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-slate-800 hover:scrollbar-thumb-pink-500"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{ 
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#db2777 #1e293b'
                        }}
                    >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">
                                    {openModal === "terms" ? "Terms of Service" : "Privacy Policy"}
                                </h2>
                                <button
                                    onClick={() => setOpenModal(null)}
                                    className="text-slate-400 hover:text-white transition"
                                    aria-label="Close modal"
                                >
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
                                {openModal === "terms" ? (
                                    <>
                                        <p className="text-slate-400 text-xs">Last updated: January 1, 2026</p>
                                        
                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">1. Acceptance of Terms</h3>
                                            <p>
                                                By accessing and using Thumbly ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                                                If you do not agree to these terms, please do not use our Service.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">2. Use of Service</h3>
                                            <p className="mb-2">You agree to use the Service only for lawful purposes. You are prohibited from:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-4">
                                                <li>Violating any applicable laws or regulations</li>
                                                <li>Infringing upon or violating our intellectual property rights</li>
                                                <li>Uploading or transmitting viruses or malicious code</li>
                                                <li>Attempting to gain unauthorized access to the Service</li>
                                                <li>Using the Service to create offensive or inappropriate content</li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">3. User Accounts</h3>
                                            <p>
                                                You are responsible for maintaining the confidentiality of your account and password. 
                                                You agree to accept responsibility for all activities that occur under your account.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">4. Content Ownership</h3>
                                            <p>
                                                All thumbnails generated using Thumbly belong to you. However, you grant us a license to use, 
                                                modify, and display your content solely for the purpose of operating and improving the Service.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">5. Payment and Refunds</h3>
                                            <p>
                                                Subscription fees are billed in advance on a monthly or annual basis. Refunds are provided 
                                                within 14 days of purchase if you're not satisfied with the Service.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">6. Service Availability</h3>
                                            <p>
                                                We strive to maintain 99.9% uptime, but we do not guarantee uninterrupted access to the Service. 
                                                We reserve the right to modify or discontinue the Service with or without notice.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">7. Limitation of Liability</h3>
                                            <p>
                                                Thumbly shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                                                resulting from your use or inability to use the Service.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">8. Changes to Terms</h3>
                                            <p>
                                                We reserve the right to modify these terms at any time. We will notify users of any material changes 
                                                via email or through the Service.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">9. Contact Information</h3>
                                            <p>
                                                If you have any questions about these Terms, please contact us at support@thumbly.com
                                            </p>
                                        </section>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-slate-400 text-xs">Last updated: January 1, 2026</p>
                                        
                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">1. Information We Collect</h3>
                                            <p className="mb-2">We collect information you provide directly to us, including:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-4">
                                                <li>Name and email address</li>
                                                <li>Account credentials</li>
                                                <li>Payment information (processed securely by third-party providers)</li>
                                                <li>Thumbnails and content you create</li>
                                                <li>Usage data and analytics</li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">2. How We Use Your Information</h3>
                                            <p className="mb-2">We use the information we collect to:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-4">
                                                <li>Provide, maintain, and improve our Service</li>
                                                <li>Process your transactions and send related information</li>
                                                <li>Send you technical notices and support messages</li>
                                                <li>Respond to your comments and questions</li>
                                                <li>Analyze usage patterns to improve user experience</li>
                                                <li>Detect and prevent fraud and abuse</li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">3. Information Sharing</h3>
                                            <p>
                                                We do not sell, trade, or rent your personal information to third parties. We may share your 
                                                information only in the following circumstances:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                                                <li>With your consent</li>
                                                <li>With service providers who assist in our operations</li>
                                                <li>To comply with legal obligations</li>
                                                <li>To protect our rights and prevent fraud</li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">4. Data Security</h3>
                                            <p>
                                                We implement industry-standard security measures to protect your personal information. 
                                                All data is encrypted in transit using SSL/TLS and at rest using AES-256 encryption.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">5. Cookies and Tracking</h3>
                                            <p>
                                                We use cookies and similar tracking technologies to track activity on our Service and 
                                                hold certain information. You can instruct your browser to refuse all cookies or to 
                                                indicate when a cookie is being sent.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">6. Data Retention</h3>
                                            <p>
                                                We retain your personal information for as long as necessary to provide the Service and 
                                                for legitimate business purposes. You can request deletion of your account at any time.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">7. Your Rights</h3>
                                            <p className="mb-2">You have the right to:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-4">
                                                <li>Access your personal information</li>
                                                <li>Correct inaccurate data</li>
                                                <li>Request deletion of your data</li>
                                                <li>Object to processing of your data</li>
                                                <li>Export your data in a portable format</li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">8. Children's Privacy</h3>
                                            <p>
                                                Our Service is not intended for users under 13 years of age. We do not knowingly collect 
                                                personal information from children under 13.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">9. Changes to Privacy Policy</h3>
                                            <p>
                                                We may update our Privacy Policy from time to time. We will notify you of any changes by 
                                                posting the new Privacy Policy on this page and updating the "Last updated" date.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-2">10. Contact Us</h3>
                                            <p>
                                                If you have any questions about this Privacy Policy, please contact us at privacy@thumbly.com
                                            </p>
                                        </section>
                                    </>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="mt-6 pt-6 border-t border-slate-800">
                                <button
                                    onClick={() => setOpenModal(null)}
                                    className="w-full py-2.5 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
