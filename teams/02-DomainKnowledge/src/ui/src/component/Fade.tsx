import styled from "styled-components";
import { fadeIn } from "@util/style/animation";

type Props = {
  timing?: string | undefined;
};

export const Fade = styled.span`
  animation: ${fadeIn} ${(props: Props) => props.timing || "250ms"} ease-in-out;
`;
