import React from 'react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/ionicons/chevronRight';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Text from 'common/components/Text';
import Container from 'common/components/UI/Container';
import BlogArea, { BlockTitle, Row, Col, BlogCard } from './blog.style';
import { BlogData } from 'common/data/AppMinimal';

const Blog = () => {
  return (
    <BlogArea id="blog_section">
      <Container className="Container">
        <BlockTitle>
          <Heading as="h3" content="What our author post on Newsfeed" />
          <Text
            as="p"
            content="Build an incredible workplace and grow your business with Gusto"
          />
        </BlockTitle>
        <Row>
          {BlogData.map(({ image, title, link }, index) => (
            <Col key={`blog-col-key-${index}`}>
              <BlogCard>
                <Image src={image} alt="blog image" />
                <Heading as="h3" content={title} />
                <Link href={link}>
                  <a className="blogLink">
                    Learn more <Icon size={12} icon={chevronRight} />
                  </a>
                </Link>
              </BlogCard>
            </Col>
          ))}
        </Row>
      </Container>
    </BlogArea>
  );
};

export default Blog;
