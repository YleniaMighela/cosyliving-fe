import React from 'react';
import emailjs from 'emailjs-com';
import './../App.css'



export default function MailForm() {

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_3d3jrkm', 'template_yfwhf7f', e.target, 'YwWXI2IpotKYzl-pl')
            .then((result) => {
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <form className="contact-form" onSubmit={sendEmail}>
            <input type="mail" />
        </form>
    );
}
