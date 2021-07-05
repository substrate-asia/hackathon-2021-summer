import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'common/components/Image';
import GlideCarousel from 'common/components/GlideCarousel';
import GlideSlide from 'common/components/GlideCarousel/glideSlide';
import GalleryWrapper, { GalleryCard, Button } from './gallery.style';

import { galleryData } from 'common/data/Interior';

const Gallery = () => {
  const glideOptions = {
    type: 'carousel',
    perView: 5,
    gap: 0,
    breakpoints: {
      1200: {
        perView: 4,
      },
      991: {
        perView: 3,
      },
      480: {
        perView: 2,
      },
    },
  };
  return (
    <GalleryWrapper id="gallery">
      <GlideCarousel
        carouselSelector="gallery_carousel"
        options={glideOptions}
        nextButton={<i className="flaticon-next" />}
        prevButton={<i className="flaticon-left-arrow" />}
      >
        <Fragment>
          {galleryData.map((item) => (
            <GlideSlide key={`gallery_key${item.id}`}>
              <GalleryCard>
                <Link href={item.link}>
                  <a>
                    <Image src={item.thumb_url} alt={item.name} />
                    <Button className="read_more__btn">
                      <span className="arrow"></span>
                      {item.name}
                    </Button>
                  </a>
                </Link>
              </GalleryCard>
            </GlideSlide>
          ))}
        </Fragment>
      </GlideCarousel>
    </GalleryWrapper>
  );
};

export default Gallery;
