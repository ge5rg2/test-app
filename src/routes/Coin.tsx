import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../assets/Spinner.gif";
import { useEffect, useState } from "react";

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

const Header = styled.header``;
const Title = styled.h1``;

const Container = styled.div`
  padding: 0 20px;
  // max-width, margin 0 auto로 모바일과 맞게 가운데로
  max-width: 480px;
  margin: 0 auto;

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
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  // useLocation으로 Link to로 보낸 정보들을 확인할 수 있다.
  const { state } = useLocation<RouteState>();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      // 아래 코드는 두줄짜리를 한줄로 캡슐화
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name}</Title>
      </Header>
      {loading ? (
        <Background>
          <LoadingText>Loading to {state?.name || "none"}</LoadingText>
          <img src={Spinner} />
        </Background>
      ) : (
        <h1>
          {info?.name} / {priceInfo?.quotes.USD.ath_price}
        </h1>
      )}
    </Container>
  );
}

export default Coin;
