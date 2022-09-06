import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  // event라고 막연하게 작성하면 typescript에선 any로 적용하기 때문에 다음과 같이 적절하게 지정을 해준다
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // typescript에선 target이 아닌 currentTarget을 사용
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
