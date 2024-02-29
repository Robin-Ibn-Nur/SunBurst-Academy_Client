import ScrollAnimation from "../../../Component/ScrollAnimation/ScrollAnimation";
import useTitle from "../../../CustomHook/useTitle";
import Banner from "../Banner/Banner";
import ContactPage from "../ContactPage/ContactPage";
import Content from "../Content/Content";
import PopulerInstructors from "../PopulerInstructors/PopulerInstructors";
import PriceComponent from "../PriceComponent/PriceComponent";
import TrustedCompany from "../TrustedCompany/TrustedCompany";


const Home = () => {
    useTitle("Home")

    return (
        <>
            <Content />
            <Banner />

            {/* populer class section */}
            <PopulerInstructors />
            <PriceComponent />
            <TrustedCompany />
            <ContactPage />
        </>

    );
};

export default Home;