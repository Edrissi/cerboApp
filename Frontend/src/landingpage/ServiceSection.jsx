
import logo from '/public/img/logo1.png';
import service1 from '/public/img/service1.png';
import service2 from '/public/img/service2.png';
import service3 from '/public/img/service3.png';

const ServiceSection = () => {
  return (
    <div className='container mx-auto py-8'>
      <h2 className='text-4xl text-blue-800 font-bold mt-8 mb-8 text-center'>Notre Service</h2>
      <h3 className='text-2xl font-bold mt-8 mb-10 text-center'>CERBO vous offre l'opportunités de discuter vos projets de recherches</h3>
      <div className='flex flex-wrap justify-center'>
        <ServiceCard image={service1} caption='Postule de Projet' logo={logo} />
        <ServiceCard image={service2} caption='Examination de Projet' logo={logo} />
        <ServiceCard image={service3} caption='Validation de Projet' logo={logo} />
      </div>
    </div>
  );
}

const ServiceCard = ({ image, caption, logo }) => {
  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8'>
      <div className='relative w-full'>
        <img src={image} alt='' className='w-full rounded-lg mb-4' />
        <div className='absolute inset-0 flex flex-col justify-center items-center bg-blue-600 bg-opacity-50 rounded-lg opacity-0 transition-opacity duration-300 hover:opacity-100'>
          <img src={logo} alt='' className='w-20 mb-2' />
          <p className='text-white'>{caption}</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceSection;
