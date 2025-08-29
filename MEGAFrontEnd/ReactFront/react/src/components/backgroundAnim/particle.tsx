import { useCallback } from "react";
// @ts-ignore
import { Particles } from "react-particles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
    // Initialize the tsparticles engine using slim version
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    // Optional callback for when particles container is loaded
    const particlesLoaded = useCallback(async (container) => {
        console.log("Particles container loaded", container);
    }, []);

    return (
        <div style={{
            position: "fixed",
            width: "100%",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: -1 // This ensures particles stay behind other content
        }}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "rgba(5,51,103,0.64)", // Black background
                        },
                    },
                    fpsLimit: 120,
                    particles: {
                        color: {
                            value: "#00ffcc", // Particle color
                        },
                        links: {
                            color: "#00ffcc", // Link color
                            distance: 150,
                            enable: true,
                            opacity: 0.4,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 2,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 100,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                    },
                    detectRetina: true,
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            repulse: {
                                distance: 100,
                                duration: 0.4,
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default ParticleBackground;