import Balance from '../components/Balance'
import Conversion from '../components/Conversion'
import ConversionHistory from '../components/ConversionHistory'
import Header from '../components/Header'
import Rules from '../components/Rules'
import Work from '../components/Work'

const Earning = () => {
  return (
    <div>
      <Header />
      <Balance />
      <Conversion />
      <Work />
      <div className='btm'>
        <ConversionHistory />
        <Rules />
      </div >
    </div>
  )
}

export default Earning
