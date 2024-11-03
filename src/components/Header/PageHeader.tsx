import React from 'react';
import { ChevronRight } from 'lucide-react';
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';
import '../../styles/animation.css'

interface Breadcrumb {
  text: string;
  url?: string;
}

interface PageHeaderProps {
  backgroundImage: string;
  title: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  backgroundImage,
  title,
  breadcrumbs = [],
  className = ''
}) => {

    const servicesRef = useAnimateOnScroll<HTMLDivElement>();
    
  return (
    <section
      className={`hero-wrap hero-wrap-2 js-fullheight ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      data-stellar-background-ratio="0.5"
    >
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
          <div ref={servicesRef} className="col-md-9 ftco-animate pb-5">
            {breadcrumbs.length > 0 && (
              <p className="breadcrumbs">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <span className={index < breadcrumbs.length - 1 ? 'mr-2' : ''}>
                      {crumb.url ? (
                        <a href={crumb.url}>
                          {crumb.text} <ChevronRight className='mb-1'/>
                        </a>
                      ) : (
                        <>
                          {crumb.text} {index < breadcrumbs.length - 1 && <ChevronRight className='mb-1' />}
                        </>
                      )}
                    </span>
                  </React.Fragment>
                ))}
              </p>
            )}
            <h1 className="mb-3 bread">{title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;