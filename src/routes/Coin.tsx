import { useParams } from "react-router-dom";

interface Params {
  coinId: string;
}

function Coin() {
  // {}을 사용한 이유는 params를 console.log 하면 obj { coinId: ~} 형식으로 나온다. 따라서 const {coinId} 를 지정해서 바로 coinId가 나오게 할 수 있다.
  // typeScript는 useParams가 빈 URL이라고 생각해서 애러알림을 보내기 때문에 <coinId:string> 혹은 interface를 사용해준다
  const { coinId } = useParams<Params>();
  return <h1>Coin: {coinId}</h1>;
}

export default Coin;
