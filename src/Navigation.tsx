import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import palette from "../src/styles/palette";
import { useSelector, useDispatch } from "./store";
import { userActions } from "./store/userSlice";

const Base = styled.div`
  max-width: 480px;

  padding: 20px 0;
  margin: 0 auto;
  border-bottom: 1px solid ${palette.gray[400]};
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    a {
      padding-right: 15px;
      transition: 0.3s ease-in-out;
      &:hover {
        color: ${(props) => props.theme.accentColor};
        scale: 1.1;
      }
    }
  }
`;

const Navigation: React.FC = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = () => {
    alert("로그아웃 되었습니다.");
    dispatch(userActions.setLoggedOut());
    return history.push("/");
  };
  return (
    <Base>
      <Link to="/">
        <span className="Nav-title">LOGO</span>
      </Link>
      {/** - 로그인 된 경우 : 마이페이지
    - URL : /mypage/order */}
      {isLoggedIn ? (
        <div>
          <Link to="/" className="Nav-item">
            <h1 className="Nav-signIn">서비스</h1>
          </Link>
          <Link to="/mypage/order" className="Nav-item">
            <h1 className="Nav-signIn">마이페이지</h1>
          </Link>
          <Link to="/logout" className="Nav-item" onClick={onLogout}>
            <h1 className="Nav-signIn">로그아웃</h1>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/" className="Nav-item">
            <h1 className="Nav-signIn">서비스</h1>
          </Link>
          <Link to="/sign-up" className="Nav-item">
            <h1 className="Nav-signIn">회원가입</h1>
          </Link>
          <Link to="/login" className="Nav-item">
            <h1 className="Nav-signIn">로그인</h1>
          </Link>
        </div>
      )}
    </Base>
  );
};

export default Navigation;
