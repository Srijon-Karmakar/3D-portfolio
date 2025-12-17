import { useNavigate } from "react-router-dom";
import { useTransition } from "../context/transitionContext";

export default function TransitionLink({ to, children }) {
  const navigate = useNavigate();
  const { setCircle } = useTransition();

  const handleClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    setCircle({ active: true, x, y });

    setTimeout(() => {
      navigate(to);
      setTimeout(() => {
        setCircle((c) => ({ ...c, active: false }));
      }, 500);
    }, 700);
  };

  return <span onClick={handleClick}>{children}</span>;
}
