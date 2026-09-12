import Balance from '../components/Balance'
import Conversion from '../components/Conversion'
import ExchangeCard from '../components/ExchangeCard'
import Header from '../components/Header'
import Info from '../components/Info'
import Work from '../components/Work'

const Earning = () => {
  const balance = {
    gems: 420,
    ves: 3850
  }

  return (
    <div className="erng">
      <Header />
      <div className='main-cnt'>
        <Balance availableGems={balance.gems} availableVEs={balance.ves} />
        <ExchangeCard />
        <Work />
        <Conversion />
        <Info />
      </div>
    </div>
  )
}

export default Earning