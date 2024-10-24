import React, { useState, useEffect } from 'react';
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';
import '../../styles/animation.css'

interface CounterItemProps {
  number: number;
  label: string;
  startAnimation: boolean;
}

const CounterItem: React.FC<CounterItemProps> = ({ number, label, startAnimation }) => {
  const [count, setCount] = useState<number>(0);
  const servicesRef = useAnimateOnScroll<HTMLDivElement>();
  
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number | null = null;
    const duration = 2000; // 2 segundos para la animación

    const animate = (currentTime: number): void => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Función de easing para hacer la animación más suave
      const easeOutQuad = (t: number): number => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      
      setCount(Math.floor(easedProgress * number));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (startAnimation) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [startAnimation, number]);

  return (
    <div ref={servicesRef} className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
      <div className="block-18">
        <div className="text text-border d-flex align-items-center">
          <strong className="number">
            {count.toLocaleString()}
          </strong>
          <span dangerouslySetInnerHTML={{ __html: label }}></span>
        </div>
      </div>
    </div>
  );
};

const CounterSection: React.FC = () => {
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setStartAnimation(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const section = document.getElementById('section-counter');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [isVisible]);

  return (
    <section className="ftco-counter ftco-section img bg-light" id="section-counter">
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <CounterItem number={10} label="Year <br>Experienced" startAnimation={startAnimation} />
          <CounterItem number={205} label="Total <br>Cars" startAnimation={startAnimation} />
          <CounterItem number={2590} label="Happy <br>Customers" startAnimation={startAnimation} />
          <CounterItem number={2} label="Total <br>Branches" startAnimation={startAnimation} />
        </div>
      </div>
    </section>
  );
};

export default CounterSection;