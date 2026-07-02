import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useCounterStore from '@/store/counterStore';
import { Button } from '@/components/ui/button';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const aaa: string | null = params.get('aaa');
  const bbb: string | null = params.get('bbb');
  const [count, setCount] = useState<number>(0);
  const goHome = () => {
    navigate('/');
  };

  const storeCount = useCounterStore((state) => state.value);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div>
      <div>
        当前路由值: {aaa} {bbb}
      </div>
      <div>当前count值：{count}</div>
      <Button onClick={() => setCount(count + 1)}>点击 +1</Button>
      <Button onClick={() => setCount(count - 1)}>点击 -1</Button>

      <div>================================分割线===================================</div>

      <div>store中count值：{storeCount}</div>
      <Button onClick={increment}>点击 +1</Button>
      <Button onClick={decrement}>点击 -1</Button>

      <Button onClick={goHome}>去首页</Button>
    </div>
  );
};

export default Login;
