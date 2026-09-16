import { useState } from 'react'
import Balance from '../components/Balance'
import Conversion from '../components/Conversion'
import ExchangeCard from '../components/ExchangeCard'
import Header from '../components/Header'
import Info from '../components/Info.jsx'
import Work from '../components/Work'

const Earning = () => {
  const [balance, setBalance] = useState({
    gems: 10,
    ves: 3850
  })

  const handleManualConversion = ({
    gemsUsed = 0,
    vesReceived = 0,
    vesUsed = 0,
    gemsReceived = 0
  }) => {
    setBalance((prev) => ({
      gems: Math.max(
        0,
        prev.gems - gemsUsed + gemsReceived
      ),
      ves: Math.max(
        0,
        prev.ves - vesUsed + vesReceived
      )
    }))
  }

  const handleDirectRewardConvert = (reward) => {
    if (balance.gems < reward.gems) {
      return false
    }

    setBalance((prev) => ({
      ...prev,
      gems: prev.gems - reward.gems,
      ves: prev.ves + reward.ve
    }))

    return true
  }

  const handleAdReward = (veReward) => {
    setBalance((prev) => ({
      ...prev,
      ves: prev.ves + veReward
    }))
  }

  return (
    <main className="earning-page">
      <div className="earning-bg">
        <div className="earning-glow glow-purple"></div>
        <div className="earning-glow glow-blue"></div>
        <div className="earning-glow glow-violet"></div>

        <div className="earning-crystal crystal-left-top">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="earning-crystal crystal-right-top">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="earning-crystal crystal-left-bottom">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="earning-crystal crystal-right-bottom">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="earning-particle particle-one"></div>
        <div className="earning-particle particle-two"></div>
        <div className="earning-particle particle-three"></div>
        <div className="earning-particle particle-four"></div>
        <div className="earning-particle particle-five"></div>
        <div className="earning-particle particle-six"></div>
        <div className="earning-particle particle-seven"></div>
        <div className="earning-particle particle-eight"></div>
      </div>

      <Header />

      <div className="main-cnt">
        <div className="earning-content">
          <Balance
            availableGems={balance.gems}
            availableVEs={balance.ves}
          />

          <ExchangeCard
            availableGems={balance.gems}
            availableVEs={balance.ves}
            onConversionComplete={handleManualConversion}
          />

          <Work />

          <Conversion
            availableGems={balance.gems}
            onDirectConvert={handleDirectRewardConvert}
            onRewardCollected={handleAdReward}
          />

          <Info />
        </div>
      </div>
    </main>
  )
}

export default Earning