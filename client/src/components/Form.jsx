import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        project: '',
        message: '',
    });

    useEffect(() => {
        AOS.init({
            duration: 1200, 
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            project: formData.project,
            message: formData.message,
        };

        emailjs.send('service_0f8yimr', 'template_l966uqc', templateParams, 'to5gUXaCWZrbtuiXb')
            .then((result) => {
                console.log(result.text);
                alert('Message sent successfully!');
            }, (error) => {
                console.log(error.text);
                alert('Failed to send message. Please try again later.');
            });
    };

    return (
        <div>
            <div
                className=" gap-16 pt-0  pr-10 sm:mt-52 items-center relative overflow-hidden p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-bl-3xl max-w-6xl mx-auto bg-gray-300/45  font-[sans-serif] before:absolute before:right-0 before:w-[300px] before:h-full max-md:before:hidden"
            >
                <div>
                    <form onSubmit={handleSubmit} >
                        <div className="space-y-4 mt-2">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="mb-2 text-sm block font-serif">NOM ET PRENOM</label>
                                    <input 
                                        type='text' 
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="px-4 py-2.5 text-base bg-white/70 border border-gray-400 w-full outline-[#0B4F48]" 
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 text-sm block font-serif">EMAIL</label>
                                    <input 
                                        type='email' 
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="px-4 py-2.5 text-base bg-white/70 border border-gray-400 w-full outline-[#0B4F48]" 
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="mb-2 text-sm block font-serif">TELEPHONE</label>
                                    <input 
                                        type='text' 
                                        name='phone'
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="px-4 py-2.5 text-base  bg-white/70 border border-gray-400 w-full outline-[#0B4F48]" 
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 text-sm block font-serif">PROJET</label>
                                    <input 
                                        type='text' 
                                        name='project'
                                        value={formData.project}
                                        onChange={handleChange}
                                        className="px-4 py-2.5 text-base  bg-white/70 border border-gray-400 w-full outline-[#0B4F48]" 
                                    />
                                </div>
                            </div>
                            <label className="mb-2 ml-32 text-sm block font-serif">MESSAGE</label>
                            <div className='flex justify-center items-center'>
                            <textarea 
                            
                                rows={10} 
                                name='message'
                                value={formData.message}
                                onChange={handleChange}
                                className="px-2 pt-3  bg-white/70  w-5/6 text-gray-800 text-sm border-b border-gray-300 focus:border-[#0B4F48] outline-none"
                            ></textarea>
                            </div>
                        </div>
                        <div className='flex justify-center items-center'>
                        <button type="submit"
                            className="mt-8 flex items-center font-serif text-2xl justify-center  w-2/3  px-6 py-3 bg-[#3C496E] text-white"
                        >
                            ENVOYER
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )           
}