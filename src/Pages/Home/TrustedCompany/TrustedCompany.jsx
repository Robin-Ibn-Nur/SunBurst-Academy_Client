import { Image } from '@nextui-org/react';
import React, { useState } from 'react';
import Marquee from "react-fast-marquee";


const TrustedCompany = () => {

    const handleHover = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    return (
        <Marquee
            pauseOnHover
            style={{ transition: 'all 0.3s ease-in-out' }}
            onHoverStart={handleHover}
            onHoverEnd={handleLeave}
        >
            <Image width={300} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fibm%2Fibm_PNG19658.png&f=1&nofb=1&ipt=2e9d3abae959ec98dd25d4034c5ee36db6497af724fab27470441c227aff5055&ipo=images" alt="Trusted Company Logo" />
        </Marquee>
    );
};

export default TrustedCompany;