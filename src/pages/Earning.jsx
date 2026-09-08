import Balance from '../components/Balance'
import Conversion from '../components/Conversion'
import ConversionHistory from '../components/ConversionHistory'
import ExchangeCard from '../components/ExchangeCard'
import Header from '../components/Header'
import Info from '../components/Info'
import Rules from '../components/Rules'

import Work from '../components/Work'

const Earning = () => {
  return (
    <div className='erng'>
      <Header />
      <Balance />
      <ExchangeCard />
      <Work />
      <Conversion />
      <div className='btm'>
        <ConversionHistory />
        <Rules />
        
      </div >
      <Info />
    </div>
  )
}

export default Earning
