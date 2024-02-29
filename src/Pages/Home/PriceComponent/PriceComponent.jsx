import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PriceComponent = () => {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    const { ref, inView, entry } = useInView({
        triggerOnce: true,
    });
    return (
        <div style={{ backgroundImage: "url(https://wallpapercave.com/wp/wp2858553.jpg)", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className="flex flex-col items-center justify-center py-5 lg:py-16 h-min-screen reveal">
            <motion.div
                ref={ref}
                variants={variants}
                initial="hidden"
                animate={inView && entry ? "visible" : "hidden"}
                className="p-10 space-y-4 text-white backdrop-filter backdrop-blur-sm bg-opacity-40 ronded-lg text-center"

            >
                <h1 className="text-4xl text-gray-500 lg:text-white font-bold mb-4">Choose a Plan</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:justify-around">
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="bg-blue-500 p-4 rounded-lg m-4"
                    >
                        <h2 className="text-2xl font-semibold mb-2">Basic</h2>
                        <p className="text-lg">$9.99/month</p>
                    </motion.div>
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="bg-green-500 p-4 rounded-lg m-4"
                    >
                        <h2 className="text-2xl font-semibold mb-2">Standard</h2>
                        <p className="text-lg">$19.99/month</p>
                    </motion.div>
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="bg-red-500 p-4 rounded-lg m-4"
                    >
                        <h2 className="text-2xl font-semibold mb-2">Premium</h2>
                        <p className="text-lg">$29.99/month</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>

    );
};

export default PriceComponent;
