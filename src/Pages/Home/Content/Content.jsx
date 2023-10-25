import Marquee from "react-fast-marquee";

const Content = () => {
    const marqueeStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        color: "white",
        fontSize: "2rem",
        marginTop: "5px",
        background: "linear-gradient(45deg, #FFC371, #FF5F6D)",
        padding: "10px",
        borderRadius: "5px",
    };
    return (
        <div className="container mx-auto  mt-5" >
            <Marquee gradientWidth={10} className="text-white text-2xl mt-5" style={marqueeStyle}>
                <span>
                    <strong>Sale!</strong> Up to 50% off on selected items. Don't miss out!
                </span>
            </Marquee>
        </div>
    );
};

export default Content;