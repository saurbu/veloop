import '../css/rules.css'
import { ShieldAlert, ChevronDown } from 'lucide-react'

const Rules = () => {
  const rules = [
    'Only eligible Gems can be exchanged.',
    'Exchange rates are predefined by VeLoop Rewards.',
    'Available conversions may vary from time to time.',
    'Successful conversions cannot be canceled or reversed.',
    'Make sure your Gems balance is sufficient before converting.',
  ]

  return (
    <div className="cons rules-card">
      <div className="containers-card">

        <div className="rules-desktop">
          <div className="rules-heading">
            <div className="rules-title">
              <div className="rules-logo">
                <ShieldAlert size={19} />
                <span />
              </div>

              <h3>Exchange Rules</h3>
            </div>

            <span className="rules-count">
              {rules.length} Rules
            </span>
          </div>

          <div className="rules-list">
            {rules.map((rule, index) => (
              <div className="rule-item" key={index}>
                <ShieldAlert className="rule-icon" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        <details className="rules-mobile">
          <summary>
            <div className="rules-title">
              <div className="rules-logo">
                <ShieldAlert size={18} />
                <span />
              </div>

              <h3>Exchange Rules</h3>
            </div>

            <ChevronDown />
          </summary>

          <div className="rules-list">
            {rules.map((rule, index) => (
              <div className="rule-item" key={index}>
                <ShieldAlert className="rule-icon" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </details>

      </div>
    </div>
  )
}

export default Rules
