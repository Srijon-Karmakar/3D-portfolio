import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "../context/transitionContext";

export default function CircleTransition() {
  const { circle } = useTransition();

  const size = Math.max(window.innerWidth, window.innerHeight) * 2;

  return (
    <AnimatePresence>
      {circle.active && (
        <motion.div
          initial={{
            width: 0,
            height: 0,
            x: circle.x,
            y: circle.y,
            borderRadius: "50%",
          }}
          animate={{
            width: size,
            height: size,
            x: circle.x - size / 2,
            y: circle.y - size / 2,
          }}
          exit={{
            width: 0,
            height: 0,
            x: circle.x,
            y: circle.y,
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            position: "fixed",
            background: "#000",
            zIndex: 9999,
          }}
        />
      )}
    </AnimatePresence>
  );
}
