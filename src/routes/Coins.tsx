import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// 같은 src 폴더에 있어야 사진등이 정상작동함
import Spinner from "../assets/Spinner.gif";

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

  ${Header} {
    height: 10vh;
    display: flex;
    align-items: center;
    ${Title} {
      color: ${(props) => props.theme.accentColor};
      font-size: 40px;
    }
  }

  ${CoinList} {
    ${Coin} {
      background-color: ${(props) => props.theme.textColor};
      color: ${(props) => props.theme.bgColor};
      border-radius: 15px;
      margin-bottom: 10px;
      a {
        padding: 20px;

        transition: color 0.2s ease-in-out;
        // 글자 범위 밖에서도 클릭 가능하도록
        display: block;
      }
      &:hover {
        // Link가 결국 anchor로 반환되기 때문에 a로 지정한다.
        a {
          color: ${(props) => props.theme.accentColor};
        }
      }
    }
  }
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // ()() 괄호를 두개 붙이면 함수를 바로 실행시킴 ex) (() => console.log("run"))();
    // 아래는 api를 fetch하는 코드
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 10));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Background>
          <LoadingText>Loading...</LoadingText>
          <img src={Spinner} />
        </Background>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            // &rarr 는 -> 이다.
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
