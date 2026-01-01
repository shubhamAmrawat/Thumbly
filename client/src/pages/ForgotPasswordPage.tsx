import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, CheckCircleIcon } from "lucide-react";

type Step = "email" | "otp" | "success";

export default function ForgotPasswordPage() {
    const [currentStep, setCurrentStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Simulated OTP (in real app, this would be sent via email)
    const [generatedOTP, setGeneratedOTP] = useState("");

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate API call to send OTP
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate random 6-digit OTP
        const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(newOTP);
        
        console.log("OTP sent to:", email);
        console.log("Generated OTP:", newOTP); // In production, this would be sent via email

        setIsLoading(false);
        setCurrentStep("otp");
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate API call to verify OTP
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (otp === generatedOTP) {
            // OTP is correct - simulate sending new password via email
            console.log("OTP verified! New password sent to:", email);
            setIsLoading(false);
            setCurrentStep("success");
        } else {
            setError("Invalid OTP. Please try again.");
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setError("");
        setIsLoading(true);

        // Generate new OTP
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(newOTP);
        
        console.log("New OTP sent to:", email);
        console.log("Generated OTP:", newOTP);

        setIsLoading(false);
        setOtp("");
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute top-20 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -30, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="w-full flex items-center justify-center px-6 py-12">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="mb-6">
                                <Link to="/" className="inline-flex items-center gap-3 hover:opacity-80 transition">
                                    <img src="/assets/logo_two.png" alt="Thumbly" className="w-12 h-12" />
                                    <span className="text-2xl font-bold text-white">thumbly</span>
                                </Link>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {currentStep === "email" && "Reset Password"}
                                {currentStep === "otp" && "Verify OTP"}
                                {currentStep === "success" && "Password Sent!"}
                            </h1>
                            <p className="text-slate-400">
                                {currentStep === "email" && "Enter your email to receive a verification code"}
                                {currentStep === "otp" && "Enter the 6-digit code sent to your email"}
                                {currentStep === "success" && "Check your email for your new password"}
                            </p>
                        </div>

                        {/* Step 1: Email Input */}
                        {currentStep === "email" && (
                            <motion.form
                                onSubmit={handleSendOTP}
                                className="space-y-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
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
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

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
                                            Sending OTP...
                                        </>
                                    ) : (
                                        "Send Verification Code"
                                    )}
                                </motion.button>
                            </motion.form>
                        )}

                        {/* Step 2: OTP Input */}
                        {currentStep === "otp" && (
                            <motion.form
                                onSubmit={handleVerifyOTP}
                                className="space-y-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-slate-300 mb-2">
                                        Verification Code
                                    </label>
                                    <input
                                        id="otp"
                                        type="text"
                                        required
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            setOtp(value);
                                            setError("");
                                        }}
                                        className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                        placeholder="000000"
                                    />
                                    <p className="mt-2 text-sm text-slate-400 text-center">
                                        Code sent to <span className="text-pink-500">{email}</span>
                                    </p>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={isLoading || otp.length !== 6}
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
                                            Verifying...
                                        </>
                                    ) : (
                                        "Verify Code"
                                    )}
                                </motion.button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={isLoading}
                                        className="text-sm text-pink-500 hover:text-pink-400 transition disabled:opacity-50"
                                    >
                                        Didn't receive code? Resend
                                    </button>
                                </div>
                            </motion.form>
                        )}

                        {/* Step 3: Success Message */}
                        {currentStep === "success" && (
                            <motion.div
                                className="space-y-6 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex justify-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    >
                                        <CheckCircleIcon className="w-20 h-20 text-green-500" />
                                    </motion.div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-white">Password Reset Successful!</h3>
                                    <p className="text-slate-400">
                                        A new temporary password has been sent to
                                    </p>
                                    <p className="text-pink-500 font-medium">{email}</p>
                                </div>

                                <div className="p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg">
                                    <p className="text-sm text-blue-400">
                                        Please check your email and use the temporary password to log in. 
                                        We recommend changing it after logging in.
                                    </p>
                                </div>

                                <motion.button
                                    onClick={() => navigate("/login")}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-medium rounded-lg transition-all duration-200"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Go to Login
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Back to Login Link */}
                        {currentStep !== "success" && (
                            <div className="mt-6 text-center">
                                <Link to="/login" className="text-sm text-slate-400 hover:text-pink-500 transition">
                                    ← Back to login
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Development Helper - Remove in production */}
                    {currentStep === "otp" && generatedOTP && (
                        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                            <p className="text-xs text-yellow-400 text-center">
                                <strong>Development Mode:</strong> OTP is <span className="font-mono text-lg">{generatedOTP}</span>
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

