import * as React from "react";
import * as R from "remeda";
import styled from "styled-components";
import { Fade } from "@component/Fade";
import { Flex } from "@component/Flex";
import { Mask } from "@component/Mask";

type Props = {
  count?: number;
};

const ListPlaceHolder = (props: Props) => {
  let count = props.count || 2;
  return (
    <Fade>
      {R.times(count, (index: number) => (
        <Item key={index} column auto>
          <Mask header />
          <Mask />
        </Item>
      ))}
    </Fade>
  );
};

const Item = styled(Flex)`
  padding: 10px 0;
`;

export default ListPlaceHolder;
