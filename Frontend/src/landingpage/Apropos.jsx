import React from 'react';
import about_img from '/public/img/apropos.png';
import play_icon from  '/public/img/play-icon.png';

const Apropos = () => {
  return (
    <div id='apropos' className='about ml-8'>
      <div className='container mx-auto py-8 px-4'>
      <h2 className='text-4xl text-blue-800 font-bold mt-8 mb-8 text-center'>A propos CERBO</h2>
        <div className='max-w-6xl mx-auto mt-5'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 '>
            <div className='w-full md:w-2/5'>
              <div className='relative'>
                <img src={about_img} className='w-full rounded-lg' alt=''/>
                <img src={play_icon} className='w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' alt=''/>
              </div>
            </div>
            <div className='w-full md:w-1/2'>
              <p className='text-2xl font-bold mb-6'>Promouvoir l'Excellence de la Recherche tout en Protégeant les Droits des Participants et en Garantissant la Conformité Éthique</p>
              <p className='text-lg text-gray-700 mb-6'>CERBO, le Comité d'Éthique de Recherche Biomédicale Oujda, est une entité dédiée à la supervision et à l'évaluation des projets de recherche biomédicale dans la région d'Oujda. Notre objectif principal est de fournir une plateforme où les investigateurs peuvent soumettre leurs projets de recherche en toute confiance, sachant qu'ils seront évalués avec le plus grand soin et éthique. Chaque projet est minutieusement examiné, noté et approuvé par les membres compétents du CERBO, ainsi que par le président, garantissant ainsi la conformité aux normes éthiques les plus strictes. En favorisant un processus d'évaluation transparent et rigoureux, CERBO vise à promouvoir la recherche biomédicale de qualité tout en protégeant les droits et le bien-être des participants à la recherche.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apropos;
