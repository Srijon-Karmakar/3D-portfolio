

// import { useEffect } from "react";
// import Spline from "@splinetool/react-spline";
// import { gsap } from "gsap";
// import TextPressure from "./TextPressure";   // ⬅️ add this
// import "./Hero.css";

// export default function Home() {
//   useEffect(() => {
//     // Animate all text + buttons inside the block
//     gsap.fromTo(
//       ".hero-text-block > *",
//       { y: 30, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         stagger: 0.12,
//         duration: 0.8,
//         ease: "power3.out",
//       }
//     );
//   }, []);

//   return (
//     <main className="hero-root">
//       <div className="hero-canvas">
//         <div className="hero-canvas-inner">
//           <div className="hero-canvas-float">
//             <Spline scene="https://prod.spline.design/cqkCM4wTqKla9twy/scene.splinecode" />
//           </div>
//         </div>
//       </div>

//       <div className="hero-bg-text">SRIJON</div>

//       <div className="hero-overlay">
//         <div className="hero-text-block">
//           {/* ==== REACTBITS TEXTPRESSURE NAME ==== */}
//           <div className="hero-name-pressure">
//             <TextPressure
//               text="Srijon"
//               flex={false}
//               alpha={false}
//               stroke={false}
//               width={true}
//               weight={true}
//               italic={true}
//               textColor="#ffffff"
//               minFontSize={32}
//               className="hero-name-line"
//             />
//             <TextPressure
//               text="Karmakar"
//               flex={false}
//               alpha={false}
//               stroke={false}
//               width={true}
//               weight={true}
//               italic={true}
//               textColor="#ffffff"
//               minFontSize={32}
//               className="hero-name-line"
//             />
//           </div>

//           {/* ==== REST OF TEXT ==== */}
//           <p className="hero-role">Full Stack Developer</p>

//           <p className="hero-subtitle">
//             Creating dynamic interfaces and immersive visuals through code,
//             creativity, and precision.
//           </p>

//           <p className="hero-body">
//             With a passion for both code and art, I build interfaces that are
//             clean, functional, and emotionally expressive. Whether it’s UI
//             design, animations, 3D elements, or backend logic — I bring ideas to
//             life end-to-end.
//           </p>

//           <div className="hero-buttons">
//             <button className="hero-btn">View Stats</button>
//             <button className="hero-btn">View CV</button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }






















import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Spline from "@splinetool/react-spline";
import { gsap } from "gsap";
import TextPressure from "./TextPressure";
import "./Hero.css";

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
      <div className="hero-canvas">
        <div className="hero-canvas-inner">
          <div className="hero-canvas-float">
            <Spline scene="https://prod.spline.design/cqkCM4wTqKla9twy/scene.splinecode" />
          </div>
        </div>
      </div>

      <div className="hero-bg-text">SRIJON</div>

      <div className="hero-overlay">
        <div className="hero-text-block">
          {/* Name with TextPressure */}
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

          {/* <div className="hero-buttons">
            <button className="hero-btn">View Stats</button>
            <button className="hero-btn">View CV</button>
          </div> */}

          <div className="hero-buttons">
            <button
              className="hero-btn"
              onClick={() => navigate("/stats")}
            >
              View Stats
            </button>

            <button
              className="hero-btn"
              onClick={() => window.open("/Srijon_Karmakar_resume.pdf", "_blank")}
            >
              View CV
            </button>
          </div>


        </div>
      </div>
    </main>
  );
}

