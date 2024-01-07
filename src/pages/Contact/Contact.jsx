import emailjs from '@emailjs/browser';
import { useRef } from 'react';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_0l5oujq', 'template_fu1g1s9', form.current, 'WjPcXt_HIonLof-9E')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                    <div className="w-full lg:w-1/2 flex flex-col gap-8 justify-center items-center text-center lg:text-left">
                        <h3 className="text-2xl font-bold">Let&apos;s Connect</h3>
                        <p className="text-base font-medium">
                            Please fill out the form on this section to contact with me between 9:00 A.M and 8:00 P.M.
                        </p>
                    </div>
                    <div className="card w-full lg:max-w-sm shadow-2xl bg-base-100">
                        <form ref={form} onSubmit={sendEmail} className="card-body p-6">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="user_name" placeholder="Your Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="user_email" placeholder="Your Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea className="textarea textarea-bordered" name='message' placeholder="Message"></textarea>
                            </div>
                            <div className="form-control">
                                <button className="btn bg-emerald-600" type="submit">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
