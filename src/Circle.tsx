import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

// ?는 optional이라 required가 아님
interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}
// props를 작성할때 등호를 사용해서 default값을 넣을수도 있다
function Circle({ bgColor, borderColor, text = "default" }: CircleProps) {
  // CircleProps에서 borderColor에 옵션을 부가했지만, ContainerProps에선 required로 되어있기 때문에 애러가 난다. 따라서 default 지정
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
