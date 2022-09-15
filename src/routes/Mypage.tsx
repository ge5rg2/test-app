import React from "react";
import Spinner from "../assets/Spinner.gif";
import styled from "styled-components";
// hooks
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

const Item = styled.div``;
const Pagenation = styled.button``;
const Header = styled.header``;
const Title = styled.h1``;
const Container = styled.div`
  padding: 0 20px;
  // max-width, margin 0 auto로 모바일과 맞게 가운데로
  max-width: 480px;
  margin: 0 auto;
  ${Header} {
    height: 6vh;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    ${Title} {
      color: ${(props) => props.theme.accentColor};
      font-size: 40px;
    }
  }
  ${Item} {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    a {
      padding: 15px;
      transition: color 0.2s ease-in-out;
      // 글자 범위 밖에서도 클릭 가능하도록
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover {
      // Link가 결국 anchor로 반환되기 때문에 a로 지정한다.
      a {
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
  .container-page {
    display: flex;
    justify-content: center;
    ${Pagenation} {
      cursor: pointer;
      margin: 0 0.5rem;
      background-color: ${(props) => props.theme.bgColor};
      border: none;
      transition: 0.3s ease-in-out;
      font-size: 1rem;
      &:hover {
        scale: 1.2;
      }
    }
    .none {
      color: ${(props) => props.theme.textColor};
    }
    .clicked {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface ItemInterface {
  id: string;
  itemName: string;
}

const Mypage: React.FC = () => {
  const [data, setData] = useState<ItemInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    // ()() 괄호를 두개 붙이면 함수를 바로 실행시킴 ex) (() => console.log("run"))();
    // 아래는 api를 fetch하는 코드
    (async () => {
      setLoading(true);
      const response = await fetch(
        `https://mycroft-test-api.herokuapp.com/order?page=${currentPage}`
      );
      const json = await response.json();
      setTotalPages(json.totalPages);
      setData(json.content);
      setLoading(false);
    })();
  }, [currentPage]);
  const movePage = (num: number) => {
    setCurrentPage(num);
  };

  return (
    <>
      {loading ? (
        <Background>
          <LoadingText>정보를 불러오는 중입니다...</LoadingText>
          <img src={Spinner} />
        </Background>
      ) : (
        <Container>
          <Header>
            <Title>마이페이지</Title>
          </Header>
          {data.map((item) => (
            <Item key={item.id}>
              <Link to={`/mypage/order/${item.id}`}>
                {item.id} : {item.itemName}
              </Link>
            </Item>
          ))}
          <div className="container-page">
            {Array(totalPages)
              .fill(0)
              .map((page, index) => (
                <Pagenation
                  className={index === currentPage ? "clicked" : "none"}
                  key={index}
                  onClick={() => movePage(index)}
                >
                  {index + 1}
                </Pagenation>
              ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default Mypage;
