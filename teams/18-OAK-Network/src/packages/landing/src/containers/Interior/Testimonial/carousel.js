import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Heading from 'common/components/Heading';

const Carousel = ({ data }) => {
  useEffect(() => {
    const glide = new Glide('#glide_carousel', {
      type: 'carousel',
      perView: 1,
      gap: 0,
    });
    glide.mount();
  });

  return (
    <div className="glide" id="glide_carousel">
      <div className="slide__wrapper">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data.map((item) => (
              <li className="glide__slide" key={`glide__slide--key${item.id}`}>
                <div className="testimonial_card">
                  <div className="user_info">
                    <Heading as="h3" content={item.name} />
                    <p>
                      {item.designation}{' '}
                      <a href={item.account_url}>{item.username}</a>
                    </p>
                  </div>
                  <div className="review">
                    <Text content={item.comment} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button
            className="glide__arrow glide__arrow--left"
            data-glide-dir="<"
            aria-label="prev"
          >
            <span className="prev_arrow"></span>
          </button>
          <button
            className="glide__arrow glide__arrow--right"
            data-glide-dir=">"
            aria-label="next"
          >
            <span className="next_arrow"></span>
          </button>
        </div>
      </div>
      <div className="glide__bullets" data-glide-el="controls[nav]">
        {data.map((item) => (
          <button
            className="glide__bullet"
            data-glide-dir={`=${item.id}`}
            key={`glide_bullet--key${item.id}`}
          >
            <Image src={item.avatar} alt={item.name} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
