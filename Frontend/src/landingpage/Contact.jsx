import { useState } from 'react';
import msg_icon from "/src/img/msg_icon.png";
import mail_icon from "/src/img/mail1.jpg";
import phone_icon from "/src/img/phone3.png";
import location_icon from "/src/img/local.jpg";

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "5f43af76-df2a-4c87-a0bf-cd8ad075133c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div id='contact' className='py-8'>
      <div className='container mx-auto max-w-screen-lg px-4 '>
      <h2 className='text-4xl text-blue-800 font-bold mt-5 mb-10 text-center'>Contactez-Nous </h2>
        <div className='grid md:grid-cols-2 gap-8'>
          <div className='text-center md:text-left'>
            <h3 className='flex items-center justify-center md:justify-start text-2xl font-semibold mb-6'>
              Envoyer un message <img src={msg_icon} alt='' className='ml-2 w-14' />
            </h3>
            <p className='text-gray-700 mb-4'>
              Que ce soit pour poser des questions, partager des commentaires ou discuter de collaborations potentielles, n'hésitez pas à nous
              contacter en utilisant le formulaire ci-dessous. Notre équipe dévouée se fera un plaisir de
              vous répondre dans les plus brefs délais.
            </p>
            <ul className='text-gray-700 mt-10'>
              <li className='flex items-center mb-4'>
                <img src={mail_icon} alt='' className='w-6 mr-2' /> mohammedoustad582002@gmail.com
              </li>
              <li className='flex items-center mb-4'>
                <img src={phone_icon} alt='' className='w-6 mr-2' /> +212 665627001
              </li>
              <li className='flex items-start mb-4'>
                <img src={location_icon} alt='' className='w-6 mr-2 mt-1' /> Route Tayret Bd Belaidi N 16, Oujda, Maroc
              </li>
            </ul>
          </div>
          <div>
            <form onSubmit={onSubmit} className='text-center md:text-left'>
              <label htmlFor='nom' className='block font-bold text-blue-700 mb-1'>Votre nom</label>
              <input type='text' name='nom' placeholder='Entrer votre nom' className='w-full bg-gray-200 px-4 py-2 mb-4 focus:outline-none focus:bg-white focus:shadow-inner border border-gray-300 rounded-md' required />
              <label htmlFor='tel' className='block font-bold text-blue-700 mb-1'>Numéro Tel</label>
              <input type='tel' name='tel' placeholder='Entrer votre numéro tel' className='w-full bg-gray-200 px-4 py-2 mb-4 focus:outline-none focus:bg-white focus:shadow-inner border border-gray-300 rounded-md'  required />
              <label htmlFor='message' className='block font-bold text-blue-700 mb-1'>Ecrire ton message ici</label>
              <textarea name='message' rows='6' placeholder='Entrer ton message' className='w-full bg-gray-200 px-4 py-2 mb-4 focus:outline-none focus:bg-white focus:shadow-inner resize-none border border-gray-300 rounded-md' required></textarea>
              <button type='submit' className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300'>Envoyer</button>
            </form>
            <span className='block text-gray-700 mt-4'>{result}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
