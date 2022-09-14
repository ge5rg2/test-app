import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../component/Button";
import { useSelector } from "../store";
import { useHistory } from "react-router-dom";

const Header = styled.header``;
const Title = styled.h1``;

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
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  useEffect(() => {
    // ()() 괄호를 두개 붙이면 함수를 바로 실행시킴 ex) (() => console.log("run"))();
    // 아래는 api를 fetch하는 코드
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setLoading(false);
    })();
  }, []);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // 로그인시 isLoggin이 true로 변경되어 token으로 비교하지 않고 isLoggin으로 비교함
    if (isLoggedIn) {
      alert("주문성공!");
    } else {
      alert("로그인 후 이용 바랍니다");
      history.push("/login");
    }
  };
  return (
    <Container>
      <Header>
        <Title>서비스</Title>
      </Header>
      <img src="https://www.advotics.com/wp-content/uploads/2022/02/surat-jalan-01-1-4.png" />
      <Button onClick={onClick} size="large">
        주문하기
      </Button>
    </Container>
  );
};

export default Main;
