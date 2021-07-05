import React from 'react';
import Link from 'next/link';
import Text from 'common/components/Text';
import CopyrightWrapper from './copyright.style';

import { socialProfile } from 'common/data/Interior';

const Copyright = () => {
  return (
    <CopyrightWrapper className="copyright_section">
      <ul>
        {socialProfile.map((profile, index) => (
          <li key={`profile_key_${index}`}>
            <Link href="#1">
              <a>
                <i className={profile.icon} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Text content="Copyrights 2019 @RedQ Inc" />
    </CopyrightWrapper>
  );
};

export default Copyright;
