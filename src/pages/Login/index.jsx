import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '@/store/counterSlice';

const Login = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const aaa = params.get('aaa');
  const bbb = params.get('bbb');
  const [count, setCount] = useState(0);
  const goHome = () => {
    navigate('/');
  };

  const storeCount = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        当前路由值: {aaa} {bbb}
      </div>
      <div>当前count值：{count}</div>
      <button onClick={() => setCount(count + 1)}>点击 +1</button>
      <button onClick={() => setCount(count - 1)}>点击 -1</button>

      <div>================================分割线===================================</div>

      <div>store中count值：{storeCount}</div>
      <button onClick={() => dispatch(increment())}>点击 +1</button>
      <button onClick={() => dispatch(decrement())}>点击 -1</button>

      <button onClick={goHome}>去首页</button>
    </div>
  );
};

export default Login;
