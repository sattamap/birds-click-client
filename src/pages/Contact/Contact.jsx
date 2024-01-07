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
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="lg:mt-20 md:text-left mb-8">
                        <h3 className="text-2xl font-bold">Let&apos;s Connect</h3>
                        <p className="text-base font-medium">
                            Please fill out the form on this section to contact with me between 9:00 A.M and 8:00 P.M.
                        </p>
                    </div>
                    <div>
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
                                <button className="btn bg-emerald-600 text-white" type="submit">Send</button>
                            </div>
                        </form>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
