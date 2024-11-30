import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim"; 

const Background = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={
        {
          background: {
            color: {
              value: "transparent", 
            },
          },
          fpsLimit: 60, 
          style: {
            position: "absolute", 
            width: "100%",
            height: "86%",
            top: "85px",
            zIndex: -1, 
          },
          interactivity: {
            events: {
              onClick: {
                enable: false, 
              },
              onHover: {
                enable: false, 
              },
              resize: true,
            },
          },
          particles: {
            color: {
              value: "#ffe18c",
            },
            links: {
              enable: false, 
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1, 
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50, 
            },
            opacity: {
              value: 1, 
            },
            shape: {
              type: "circle", 
            },
            size: {
              value: { min: 0.2, max: 2 },
            },
          },
          detectRetina: true,
        }
      }
    />
  );
};
export default Background;
