import useTitle from "../../../CustomHook/useTitle";
import Banner from "../Banner/Banner";


const Home = () => {
    useTitle("Home")

    return (
        <>
            <Banner />
        </>

    );
};

export default Home;