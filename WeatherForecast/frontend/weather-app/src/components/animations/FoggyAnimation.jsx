import React from 'react';

const FoggyWeatherBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-700">
      {/* Fog layers with different speeds and opacities */}
      <div className="absolute inset-0 fog-layer-1"></div>
      <div className="absolute inset-0 fog-layer-2"></div>
      <div className="absolute inset-0 fog-layer-3"></div>
      
      {/* Clouds */}
      <div className="absolute cloud cloud-1"></div>
      <div className="absolute cloud cloud-2"></div>
      <div className="absolute cloud cloud-3"></div>
      <div className="absolute cloud cloud-4"></div>
      <div className="absolute cloud cloud-5"></div>
      <div className="absolute cloud cloud-6"></div>
      
      {/* Particles for mist effect */}
      <div className="particles">
        {Array(40).fill().map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${10 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.2 + Math.random() * 0.4
          }}></div>
        ))}
      </div>
      
      <style>{`
        /* Fog Animations */
        @keyframes fogAnimation1 {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fogAnimation2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes fogAnimation3 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }
        
        /* Cloud Animation */
        @keyframes cloudDrift {
          0% { transform: translateX(-100%) translateY(0); }
          50% { transform: translateX(50vw) translateY(-10px); }
          100% { transform: translateX(100vw) translateY(0); }
        }
        
        /* Particle Animation */
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
          100% { transform: translateY(0) translateX(0); opacity: 0.2; }
        }
        
        /* Fog Layers */
        .fog-layer-1 {
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.3) 20%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.3) 80%,
            transparent
          );
          animation: fogAnimation1 30s linear infinite;
        }
        
        .fog-layer-2 {
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.2) 80%,
            transparent
          );
          animation: fogAnimation2 25s linear infinite;
        }
        
        .fog-layer-3 {
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.1) 20%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.1) 80%,
            transparent
          );
          animation: fogAnimation3 35s linear infinite;
        }
        
        /* Clouds */
        .cloud {
          background: rgba(255, 255, 255, 0.85);
          border-radius: 50px;
          filter: blur(15px);
          animation: cloudDrift linear infinite;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        
        .cloud-1 {
          width: 250px;
          height: 120px;
          top: 5%;
          animation-duration: 60s;
        }
        
        .cloud-2 {
          width: 350px;
          height: 140px;
          top: 25%;
          animation-duration: 75s;
          animation-delay: 10s;
        }
        
        .cloud-3 {
          width: 300px;
          height: 110px;
          top: 45%;
          animation-duration: 65s;
          animation-delay: 5s;
        }
        
        .cloud-4 {
          width: 280px;
          height: 100px;
          top: 65%;
          animation-duration: 80s;
          animation-delay: 15s;
        }

        .cloud-5 {
          width: 320px;
          height: 130px;
          top: 15%;
          animation-duration: 70s;
          animation-delay: 25s;
        }

        .cloud-6 {
          width: 270px;
          height: 115px;
          top: 85%;
          animation-duration: 85s;
          animation-delay: 20s;
        }
        
        /* Particles */
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          filter: blur(3px);
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FoggyWeatherBackground;