import '../css/conversionHistory.css'
import { ChevronDown } from 'lucide-react'
const ConversionHistory = () => {
  const gems = [
    { status: 'Completed', gems: '33', ve: '157', color: 'green' },
    { status: 'Processing', gems: '35', ve: '216', color: 'orange' },
    { status: 'Failed', gems: '30', ve: '183', color: 'red' },
  ]

  return (
    <div className="cons history-card">
      <div className="containers-card">
        <details className="history-dropdown">
          <summary>
            <h3> Conversion History</h3> 
              <ChevronDown />
          </summary>

          <div className="history-list">
            {gems.map((value) => (
              <div
                key={`${value.gems}-${value.status}`}
                className="cont-convrsn"
              >
                <div className="contents">
                  <div className="germ">
                    <h4>
                      {value.gems}{' '}
                      <span className="txt-gems">Gems</span>
                    </h4>

                    <div className="arrows">
                      <span />
                      <span />
                    </div>

                    <h4>
                      {value.ve}{' '}
                      <span className="txt-ves">VEs</span>
                    </h4>
                  </div>
                </div>

                <div className="card-sts">
                  <p className={`statuses ${value.color}`}>
                    {value.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </details>

        <div className="history-desktop">
          <h3>Conversion History </h3>

          <div className="history-list">
            {gems.map((value) => (
              <div
                key={`${value.gems}-${value.status}`}
                className="cont-convrsn"
              >
                <div className="contents">
                  <div className="germ">
                    <h4>
                      {value.gems}{' '}
                      <span className="txt-gems">Gems</span>
                    </h4>

                    <div className="arrows">
                      <span />
                      <span />
                    </div>

                    <h4>
                      {value.ve}{' '}
                      <span className="txt-ves">VEs </span>
                    </h4>
                  </div>
                </div>

                <div className="card-sts">
                  <p className={`statuses ${value.color}`}>
                    {value.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversionHistory