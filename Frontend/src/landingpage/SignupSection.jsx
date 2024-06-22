import { useNavigate } from 'react-router-dom';
import membre from '/public/img/2.png';
import investigateur from '/public/img/3.png';

const SignupSection = () => {
  const navigate = useNavigate(); // Using the useNavigate hook

  const handleNavigate = (route) => {
    navigate(route); // Navigating to the specified route
  };

  return (
    <div id='signupsection' className="flex flex-col justify-center items-center h-screen">
      <h2 className='text-4xl text-blue-800 font-bold mt-8 mb-8 text-center'>Vous-Etes</h2>
      <h3 className='text-2xl font-bold mb-11 text-center'>Choisir votre type d'inscription</h3>
      <div className="container mx-auto flex space-x-8 justify-center">
        <div 
          className="signup-card relative w-80 h-80 bg-blue-300 rounded-xl p-10 shadow-lg cursor-pointer mr-8 duration-300 hover:bg-white" 
          onClick={() => handleNavigate('/signup/membre')}
        >
          <img src={membre} alt="Membre" className="mx-auto w-40" />
          <p className="card-title text-blue-950 text-center text-lg font-bold">Membre</p>
        </div>
        <div 
          className="signup-card relative w-80 h-80 bg-blue-300 rounded-xl p-10 shadow-lg cursor-pointer duration-300 hover:bg-white" 
          onClick={() => handleNavigate('/signup/invis')}
        >
          <img src={investigateur} alt="Investigateur" className="mx-auto w-40" />
          <p className="card-title text-blue-950 text-center text-lg font-bold">Investigateur</p>      
        </div>
      </div>
    </div>
  );
};

export default SignupSection;
