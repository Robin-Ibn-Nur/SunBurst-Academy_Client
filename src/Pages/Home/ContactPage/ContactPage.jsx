import React from 'react';
import { Input, Button, Divider, Card } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

import contactImg from "../../../assets/Image/contact.jpg";

const ContactPage = () => {
    const { handleSubmit, register, reset } = useForm();

    const onSubmit = (data) => {
        const { name } = data;
        Swal.fire(`Thank You ${name}. We will contact you soon.`);
        reset();
    };

    const contactBgImg = {
        backgroundImage: `url(${contactImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        justifyContent: 'center',
    };

    return (
        <Card style={contactBgImg} className="my-5 reveal">
            <div className=" reveal p-10 space-y-4 text-white backdrop-filter backdrop-blur-sm bg-opacity-40">
                <h2 className="text-3xl font-bold">Contact Us</h2>
                <Divider />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Your Name"
                            {...register('name', { required: true })}
                            variant='underlined'
                        />
                        <Input
                            type="email"
                            placeholder="Your Email"
                            {...register('email', { required: true })}
                            variant='underlined'
                        />
                        <Input
                            type="text"
                            placeholder="Your Message"
                            {...register('message', { required: true })}
                            variant='underlined'
                        />
                    </div>
                    <Button type="submit" className="bg-blue-500 text-white mt-5">
                        Send Message
                    </Button>
                </form>
            </div>
        </Card>
    );
};

export default ContactPage;
