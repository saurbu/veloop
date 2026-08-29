import '../css/balance.css'
import { Info} from 'lucide-react'
const Balance = () => {
  return (
    <div className="bal">
      <div className='bal-1'>
        <div>
            <div className="gem-wrapper">
                <div className="gem-glow" />

                    <div className="gem">
                    <div className="gem-face gem-top" />
                    <div className="gem-face gem-left" />
                    <div className="gem-face gem-right" />
                    <div className="gem-face gem-bottom" />
                </div>

                <div className="gem-shadow" />
            </div>
        </div>
        <div>
            <p className='avl'>AVAILABLE GEMS</p>
            <h2>120</h2>
            <span className='info'><Info /> What are Gems?</span>
        </div>
      </div>
      <div className='bal-1 ve'>
        <div className="coin-wrapper">
        <div className="coin-glow" />

        <div className="coin">
          <div className="coin-inner">
            <span>VE</span>
          </div>
        </div>

        <div className="coin-shadow" />
      </div>
      <div>
            <p className='avl'>AVAILABLE VEs</p>
            <h2>450</h2>
            <span className='info'><Info /> What are VEs?</span>
        </div>
      </div>
    </div>
  )
}

export default Balance
