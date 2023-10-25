import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bgImg from "../../assets/Image/main_how_to_design_404_page.webp"
const backgroundImageUrl = bgImg;


const ErrorPage = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate("/");
    };
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="flex items-center justify-center min-h-screen"
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-8 rounded-lg"
            >
                <p className="text-4xl text-white mb-8">Oops! Page not found.</p>
                <button
                    onClick={handleBackHome}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back to Home
                </button>
            </motion.div>
        </div>

    );
};

export default ErrorPage;