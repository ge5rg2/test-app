import { Route, Switch, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../assets/Spinner.gif";
import { useEffect, useState } from "react";
import Price from "./Price";
import Chart from "./Chart";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

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
    KRW: {
      price: number;
      market_cap: number;
      volume_24h: number;
      percent_change_24h: number;
      percent_change_7d: number;
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
      // quotes=KRW옵션을 적용해서 한국 화폐단위로 출력시켰다.
      const preData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers?quotes=KRW`)
      ).json();
      const priceData = await preData
        .slice(0, 100)
        .filter((el: any) => el.id == coinId)[0];
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  // Need to : state가 아닌 접근일 경우 차단해야함
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Background>
          <LoadingText>Loading to {state?.name}</LoadingText>
          <img src={Spinner} />
        </Background>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>Price(KRW):</span>
              <span style={{ color: "#4cd137" }}>
                {Number(
                  priceInfo?.quotes.KRW.price.toFixed(1)
                ).toLocaleString()}
                ₩
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>24H CHANGE:</span>
              {Number(priceInfo?.quotes.KRW.percent_change_24h.toFixed(2)) <
              0 ? (
                <span style={{ color: "#00a8ff" }}>
                  {priceInfo?.quotes.KRW.percent_change_24h.toFixed(2)}%
                </span>
              ) : (
                <span style={{ color: "#e84118" }}>
                  +{priceInfo?.quotes.KRW.percent_change_24h.toFixed(2)}%
                </span>
              )}
            </OverviewItem>
            <OverviewItem>
              <span>7D CHANGE:</span>
              {Number(priceInfo?.quotes.KRW.percent_change_7d.toFixed(2)) <
              0 ? (
                <span style={{ color: "#00a8ff" }}>
                  {priceInfo?.quotes.KRW.percent_change_7d.toFixed(2)}%
                </span>
              ) : (
                <span style={{ color: "#e84118" }}>
                  +{priceInfo?.quotes.KRW.percent_change_7d.toFixed(2)}%
                </span>
              )}
            </OverviewItem>
          </Overview>
          <Description>{info?.description || "No description"}</Description>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
