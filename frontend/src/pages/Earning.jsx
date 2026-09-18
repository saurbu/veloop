import { useEffect, useState } from 'react'
import Balance from '../components/Balance'
import Conversion from '../components/Conversion'
import ExchangeCard from '../components/ExchangeCard'
import Header from '../components/Header'
import Info from '../components/Info.jsx'
import Work from '../components/Work'

const API_URL = 'https://veloop-a2i3.onrender.com/'

const Earning = () => {
  const [balance, setBalance] = useState({
    gems: 0,
    ves: 0
  })

  const [loading, setLoading] = useState(true)

  const updateBalance = (updatedBalance) => {
    if (!updatedBalance) {
      return
    }

    setBalance({
      gems: Number(updatedBalance.gems) || 0,
      ves: Number(updatedBalance.ves) || 0
    })
  }

  const fetchBalance = async () => {
    try {
      const response = await fetch(`${API_URL}/api/balance`)
      const data = await response.json()

      if (data.success) {
        updateBalance(data.balance)
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [])

  const handleManualConversion = (updatedBalance) => {
    if (!updatedBalance) {
      return false
    }

    updateBalance(updatedBalance)

    return true
  }

  const handleDirectRewardConvert = (updatedBalance) => {
    if (!updatedBalance) {
      return false
    }

    updateBalance(updatedBalance)

    return true
  }

  const handleAdReward = (updatedBalance) => {
    if (!updatedBalance) {
      return false
    }

    updateBalance(updatedBalance)

    return true
  }

  if (loading) {
    return null
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