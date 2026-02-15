import { useEffect, useRef } from "react";
import { Particle } from "./Particle";

function CanvasSimulation({ temperature, particleCount, isRunning, setAverageSpeed, addDataPoint }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  let frameCount = 0;

  // 1. Создание / пересоздание частиц
  useEffect(() => {
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;

    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(
        new Particle(
          Math.random() * width,
          Math.random() * height
        )
      );
    }
  }, [particleCount]);

  // 2. Анимация (один раз)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    function animate() {

      frameCount++;

      if (frameCount % 30 === 0) {
        let sumSpeed = 0;

        particlesRef.current.forEach((p) => {
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          sumSpeed += speed;
        });

        const avg = sumSpeed / particlesRef.current.length;
        setAverageSpeed(avg);
        addDataPoint(avg);
      }


      ctx.clearRect(0, 0, width, height);

      if (isRunning) {
        particlesRef.current.forEach((p) => {
          p.update(temperature);

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        });
      }

      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
      })

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [temperature, isRunning]);
  

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={500}
      style={{ border: "1px solid black" }}
    />
  );
}

export default CanvasSimulation;
