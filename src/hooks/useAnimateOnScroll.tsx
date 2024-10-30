import { useEffect, useRef } from 'react';

const useAnimateOnScroll = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('item-animate');
            
            setTimeout(() => {
              const elements = document.querySelectorAll('.ftco-animate.item-animate');
              elements.forEach((el, index) => {
                setTimeout(() => {
                  const animateEffect = el.getAttribute('data-animate-effect');
                  if (animateEffect === 'fadeIn') {
                    el.classList.add('fadeIn', 'ftco-animated');
                  } else if (animateEffect === 'fadeInLeft') {
                    el.classList.add('fadeInLeft', 'ftco-animated');
                  } else if (animateEffect === 'fadeInRight') {
                    el.classList.add('fadeInRight', 'ftco-animated');
                  } else {
                    el.classList.add('fadeInUp', 'ftco-animated');
                  }
                  el.classList.remove('item-animate');
                }, index * 50);
              });
            }, 100);
            
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '-5%'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return ref;
};

export default useAnimateOnScroll;
