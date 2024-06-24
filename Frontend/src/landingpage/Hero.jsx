

const Hero = () => {
  return (
    <div className="hero bg-gradient-to-r from-purple-800 to-purple-600 bg-cover bg-center h-screen w-screen flex items-center justify-center" style={{backgroundImage: "linear-gradient(rgba(8, 0, 58, 0.7), rgba(8, 0, 58, 0.7)), url('/public/img/Hero.jpg')"}}>
      <div className="hero-text text-center text-white max-w-3xl px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 mt-11">Comité d’éthique pour la Recherche Biomédicale d’Oujda (CERBO)</h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">Notre comité se soucie de vos recherches biomédicales et de la Soumission de vos protocoles de Recherche</p>
        {/* <button className="btn px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Explorer</button> */}
      </div>
    </div>
  );
};

export default Hero;
