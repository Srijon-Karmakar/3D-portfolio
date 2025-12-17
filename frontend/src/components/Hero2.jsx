import { useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { gsap } from "gsap";

import TextPressure from "./TextPressure";
import Model from "./model";
import "./Hero2.css";


export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        gsap.fromTo(
            ".hero-text-block > *",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.12,
                duration: 0.8,
                ease: "power3.out",
            }
        );
    }, []);

    return (
        <main className="hero-root">
            {/* 3D CANVAS AREA */}
            {/* 3D CANVAS AREA */}
            <div className="hero-canvas">
                <div className="hero-canvas-inner">
                    <div className="hero-canvas-float">
                        <Canvas
                            camera={{ position: [1.6, 1.7, 6.5], fov: 35 }}
                            dpr={[1, 2]}
                            gl={{ antialias: true, alpha: true }} // ⬅ transparent canvas
                        >
                            {/* no background color → full transparency over violet CSS */}
                            <Suspense fallback={null}>
                                {/* LIGHTS */}
                                <ambientLight intensity={0.5} />
                                <directionalLight
                                    position={[3, 4, 5]}
                                    intensity={1.2}
                                    castShadow
                                />
                                <spotLight
                                    position={[-4, 6, 3]}
                                    angle={0.55}
                                    intensity={0.9}
                                    penumbra={0.6}
                                />

                                {/* MODEL – smaller & pushed to the right */}
                                <group position={[2.4, -1.25, 0]}>
                                    <Model scale={0.5} rotation={[0, -Math.PI / 2, 0]} />
                                </group>


                                {/* Soft shadow under bot, aligned with its X/Z */}
                                <ContactShadows
                                    position={[2.4, -1.7, 0]}
                                    opacity={0.4}
                                    blur={3}
                                    far={6}
                                    resolution={1024}
                                    color="#1a102e"
                                />

                                {/* Environment lighting for realism */}
                                <Environment preset="city" />

                                {/* POSTPROCESSING: bloom + vignette (3D depth feel) */}
                                <EffectComposer disableNormalPass>
                                    <Bloom
                                        intensity={0.7}
                                        luminanceThreshold={0.6}
                                        luminanceSmoothing={0.4}
                                        radius={0.9}
                                    />
                                    <Vignette
                                        eskil={false}
                                        offset={0.35}
                                        darkness={0.8}
                                    />
                                </EffectComposer>
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </div>


            {/* BACKGROUND WATERMARK TEXT */}
            {/* <div className="hero-bg-text">SRIJON</div> */}

            {/* TEXT OVERLAY */}
            <div className="hero-overlay">
                <div className="hero-text-block">
                    <div className="hero-name-pressure">
                        <TextPressure
                            text="Srijon"
                            flex={false}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            textColor="#ffffff"
                            minFontSize={16}
                            className="hero-name-line"
                        />
                        <TextPressure
                            text="Karmakar"
                            flex={false}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            textColor="#ffffff"
                            minFontSize={16}
                            className="hero-name-line"
                        />
                    </div>

                    <p className="hero-role">Full Stack Developer</p>

                    <p className="hero-subtitle">
                        Creating dynamic interfaces and immersive visuals through code,
                        creativity, and precision.
                    </p>

                    <p className="hero-body">
                        With a passion for both code and art, I build interfaces that are
                        clean, functional, and emotionally expressive. Whether it’s UI
                        design, animations, 3D elements, or backend logic — I bring ideas to
                        life end-to-end.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="hero-btn"
                            onClick={() => navigate("/stats")}
                        >
                            View Stats
                        </button>

                        <button
                            className="hero-btn"
                            onClick={() =>
                                window.open("/Srijon_Karmakar_resume.pdf", "_blank")
                            }
                        >
                            View CV
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
