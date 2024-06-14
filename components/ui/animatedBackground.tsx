import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const generateRandomPosition = () => {
  return {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  };
};

const AnimatedBackground = () => {
  const [positions, setPositions] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    const initialPositions = Array.from({ length: 10 }, generateRandomPosition);
    setPositions(initialPositions);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {positions.map((position, index) => (
        <motion.div
          key={index}
          className="absolute bg-blue-500 rounded-full"
          style={{
            width: 100,
            height: 100,
            ...position,
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: [0, 1, 0], y: [50, 0, -50], transition: { duration: 5, repeat: Infinity, repeatType: "mirror" } }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
