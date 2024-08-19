import { useNavigate } from 'react-router-dom'
import Details from './Details'
import { useSelector } from 'react-redux'

const Home = () => {
  const navigate = useNavigate()
  const goLogin = () => {
    navigate('/login?aaa=111&bbb=222&ccc=333')
  }

  const storeCount = useSelector((state) => state.counter.value)

  return (
    <>
      <div>
        Home
        <div>store中count值：{storeCount}</div>
        <button onClick={goLogin}>去登录页</button>
      </div>
      <Details />
    </>
  )
}

export default Home
