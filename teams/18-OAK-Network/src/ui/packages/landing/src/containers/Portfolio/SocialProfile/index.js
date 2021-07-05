import React from 'react';
import Link from 'next/link';
import Icon from 'react-icons-kit';
import { socialDribbbleOutline } from 'react-icons-kit/ionicons/socialDribbbleOutline';
import { SocialProfileWrapper, SocialProfileItem } from './socialProfile.style';

const SocialProfile = ({ items, className, iconSize }) => {
  const addAllClasses = ['social_profiles'];

  if (className) {
    addAllClasses.push(className);
  }

  return (
    <SocialProfileWrapper className={addAllClasses.join(' ')}>
      {items.map((item, index) => (
        <SocialProfileItem
          key={`social-item-${index}`}
          className="social_profile_item"
        >
          <Link href={item.url || '#'}>
            <a aria-label="social icon">
              <Icon
                icon={item.icon || socialDribbbleOutline}
                size={iconSize || 22}
              />
            </a>
          </Link>
        </SocialProfileItem>
      ))}
    </SocialProfileWrapper>
  );
};

export default SocialProfile;
