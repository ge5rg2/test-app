import styled from "styled-components";

// styled에 쓰이는 props를 위한 interface 생성
interface ContainerProps {
  bgColor: string;
}

// 위에서 타입을 지정했기 때문에 props를 사용할 수 있다
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

interface CircleProps {
  bgColor: string;
}

// props의 타입을 지정하기 위해 interface를 생성
function Circle({ bgColor }: CircleProps) {
  // 마찬가지로 styled에도 사용하려면 type를 지정해야하기 때문에
  return <Container bgColor={bgColor} />;
}

export default Circle;
