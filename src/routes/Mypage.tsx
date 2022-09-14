import MyOreder from "./MyOrder";
import React from "react";
// 같은 src 폴더에 있어야 사진등이 정상작동함
import Spinner from "../assets/Spinner.gif";
// about css
import styled from "styled-components";
import palette from "../styles/palette";
// common
import Button from "../component/Button";
import Input from "../component/Input";
// hooks
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "../store";
import { userActions } from "../store/userSlice";

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

const Mypage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // ()() 괄호를 두개 붙이면 함수를 바로 실행시킴 ex) (() => console.log("run"))();
    // 아래는 api를 fetch하는 코드
    (async () => {
      const response = await fetch(
        "https://mycroft-test-api.herokuapp.com/order"
      );
      const json = await response.json();
      console.log(json);
      setLoading(false);
    })();
  }, []);
  return (
    <>
      {loading ? (
        <Background>
          <LoadingText>정보를 불러오는 중입니다...</LoadingText>
          <img src={Spinner} />
        </Background>
      ) : (
        <h1>s</h1>
      )}
    </>
  );
};

export default Mypage;
