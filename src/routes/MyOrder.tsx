import React from "react";
import Spinner from "../assets/Spinner.gif";
// about css
import styled from "styled-components";
// hooks
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Overview = styled.div``;
const OverviewItem = styled.div``;
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
  ${Overview} {
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    margin-bottom: 10px;
    border-radius: 10px;
    ${OverviewItem} {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
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

interface RouteParams {
  itemId: string;
}

interface ItemInterface {
  id?: number;
  itemName?: string;
}

const MyOrder: React.FC = () => {
  const [data, setData] = useState<ItemInterface>();
  // you have to match the destructure to your path
  const { itemId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://mycroft-test-api.herokuapp.com/order/${itemId}`
      );
      const json = await response.json();
      setData(json);
      setLoading(false);
    })();
  }, [itemId]);
  return (
    <>
      {loading ? (
        <Background>
          <LoadingText>{itemId}번 물건을 불러오는 중입니다...</LoadingText>
          <img src={Spinner} />
        </Background>
      ) : (
        <Container>
          <Header>
            <Title>상세</Title>
          </Header>
          <Overview>
            <OverviewItem>ID: {data?.id}</OverviewItem>
            <OverviewItem>NAME: {data?.itemName}</OverviewItem>
          </Overview>
        </Container>
      )}
    </>
  );
};

export default MyOrder;
