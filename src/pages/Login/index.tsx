import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '@/store/counterSlice';
import { CounterState } from '@/store';
import { Button } from 'antd';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const aaa: string | null = params.get('aaa');
  const bbb: string | null = params.get('bbb');
  const [count, setCount] = useState<number>(0);
  const goHome = () => {
    navigate('/');
  };

  const storeCount = useSelector((state: CounterState) => state.counter.value);
  const dispatch = useDispatch();

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
      <Button onClick={() => dispatch(increment())}>点击 +1</Button>
      <Button onClick={() => dispatch(decrement())}>点击 -1</Button>

      <Button onClick={goHome}>去首页</Button>
    </div>
  );
};

export default Login;
