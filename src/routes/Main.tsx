import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// 같은 src 폴더에 있어야 사진등이 정상작동함
import Spinner from "../assets/Spinner.gif";
import Button from "../component/Button";

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.bgColor};
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 100px;
  }
`;

const LoadingText = styled.div`
  text-align: center;
`;

const CoinList = styled.div``;
const Header = styled.header``;
const Title = styled.h1``;
const Coin = styled.div``;

const Container = styled.div`
  padding: 0 20px;
  // max-width, margin 0 auto로 모바일과 맞게 가운데로
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  Button {
    margin-top: 30px;
    color: ${(props) => props.theme.textColor};
    border: 1px solid ${(props) => props.theme.textColor};
    transition: 0.3s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.accentColor};
      border: 1px solid ${(props) => props.theme.accentColor};
    }
    &:active {
      scale: 0.8;
    }
  }
  ${Header} {
    height: 8vh;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    ${Title} {
      color: ${(props) => props.theme.accentColor};
      font-size: 40px;
    }
  }

  img {
    max-width: inherit;
  }
`;

const Main = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // ()() 괄호를 두개 붙이면 함수를 바로 실행시킴 ex) (() => console.log("run"))();
    // 아래는 api를 fetch하는 코드
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setLoading(false);
    })();
  }, []);

  const onClick = () => {};
  return (
    <Container>
      <Header>
        <Title>서비스</Title>
      </Header>
      <img src="https://www.advotics.com/wp-content/uploads/2022/02/surat-jalan-01-1-4.png" />
      <Button onClick={onClick} size="large">
        주문하기
      </Button>
      {loading ? (
        <Background>
          <LoadingText>Loading...</LoadingText>
          <img src={Spinner} />
        </Background>
      ) : (
        <CoinList></CoinList>
      )}
    </Container>
  );
};

export default Main;
