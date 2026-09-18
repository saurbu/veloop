import '../css/conversionHistory.css'
import { ChevronDown, X, History } from 'lucide-react'
import { useState } from 'react'

const ConversionHistory = () => {
  const [showModal, setShowModal] = useState(false)

  const gems = [
    { id: 1, status: 'Completed', gems: '33', ve: '157', color: 'green', date: 'Today, 10:32 AM' },
    { id: 2, status: 'Processing', gems: '35', ve: '216', color: 'orange', date: 'Today, 09:15 AM' },
    { id: 3, status: 'Failed', gems: '30', ve: '183', color: 'red', date: 'Yesterday, 08:45 PM' },
    { id: 4, status: 'Completed', gems: '40', ve: '205', color: 'green', date: 'Yesterday, 04:20 PM' },
    { id: 5, status: 'Completed', gems: '25', ve: '128', color: 'green', date: 'Sep 6, 02:15 PM' },
    { id: 6, status: 'Processing', gems: '45', ve: '230', color: 'orange', date: 'Sep 5, 11:40 AM' },
    { id: 7, status: 'Failed', gems: '20', ve: '95', color: 'red', date: 'Sep 4, 07:30 PM' },
    { id: 8, status: 'Completed', gems: '50', ve: '260', color: 'green', date: 'Sep 3, 05:10 PM' },
    { id: 9, status: 'Completed', gems: '28', ve: '142', color: 'green', date: 'Sep 2, 01:25 PM' },
    { id: 10, status: 'Completed', gems: '38', ve: '194', color: 'green', date: 'Sep 1, 09:50 AM' },
  ]

  const HistoryItem = ({ value }) => (
    <div className="cont-convrsn">
      <div className="contents">
        <div className="germ">
          <h4>
            {value.gems} <span className="txt-gems">Gems</span>
          </h4>

          <div className="arrows">
            <span />
            <span />
          </div>

          <h4>
            {value.ve} <span className="txt-ves">VEs</span>
          </h4>
        </div>

        <p className="history-date">{value.date}</p>
      </div>

      <div className="card-sts">
        <p className={`statuses ${value.color}`}>
          {value.status}
        </p>
      </div>
    </div>
  )

  const ViewAll = () => (
    <button
      className="view-all-btn"
      onClick={() => setShowModal(true)}
    >
      View All
    </button>
  )

  return (
    <>
      <div className="cons history-card">
        <div className="containers-card">

          <div className="history-desktop">
            <div className="history-heading">
              <div className="history-title">
                <div className="history-logo">
                  <History size={19} />
                  <span />
                </div>

                <h3>Conversion History</h3>
              </div>

              <span className="history-count">
                {gems.length} Records
              </span>
            </div>

            <div className="history-list">
              {gems.slice(0, 3).map((value) => (
                <HistoryItem key={value.id} value={value} />
              ))}
            </div>

            <div className="view-all-wrap">
              <ViewAll />
            </div>
          </div>

          <div className="history-tablet">
            <div className="history-heading">
              <div className="history-title">
                <div className="history-logo">
                  <History size={18} />
                  <span />
                </div>

                <h3>Conversion History</h3>
              </div>

              <span className="history-count">
                {gems.length} Records
              </span>
            </div>

            <div className="history-list">
              {gems.slice(0, 4).map((value) => (
                <HistoryItem key={value.id} value={value} />
              ))}
            </div>

            <div className="view-all-wrap">
              <ViewAll />
            </div>
          </div>

          <details className="history-dropdown">
            <summary>
              <div className="history-title">
                <div className="history-logo">
                  <History size={18} />
                  <span />
                </div>

                <h3>Conversion History</h3>
              </div>

              <ChevronDown />
            </summary>

            <div className="history-list">
              {gems.slice(0, 3).map((value) => (
                <HistoryItem key={value.id} value={value} />
              ))}
            </div>

            <div className="view-all-wrap">
              <ViewAll />
            </div>
          </details>

        </div>
      </div>

      {showModal && (
        <div
          className="history-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="history-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="history-modal-header">
              <div className="history-modal-title">
                <div className="history-modal-logo">
                  <History size={20} />
                </div>

                <div>
                  <h3>Conversion History</h3>
                  <p>All your recent Gem conversions</p>
                </div>
              </div>

              <button
                className="history-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <X />
              </button>
            </div>

            <div className="history-modal-list">
              {gems.map((value) => (
                <HistoryItem key={value.id} value={value} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ConversionHistory