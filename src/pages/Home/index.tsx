import React from 'react';
import { useNavigate } from 'react-router-dom';
import Details from '@/pages/Home/Details';
import useCounterStore from '@/store/counterStore';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate('/login?aaa=111&bbb=222&ccc');
  };

  const storeCount = useCounterStore((state) => state.value);

  return (
    <>
      <div>
        Home
        <div>store中count值：{storeCount}</div>
        <Button onClick={goLogin}>去登录页</Button>
      </div>
      <Details />
    </>
  );
};

export default Home;
