import '../css/rules.css'
import { ShieldAlert, ChevronDown } from 'lucide-react'

const Rules = () => {
  const rules = [
    'Only eligible Gems can be exchanged.',
    'Exchange rates are predefined by VeLoop Rewards.',
    'Available conversions may vary from time to time.',
    'Successful conversions cannot be canceled or reversed.',
    'Make sure your Gems balance is sufficient before converting. ',
  ]

  return (
    <div className="cons rules-card">
      <div className="containers-card">

        <div className="rules-desktop">
          <h3>Exchange Rules</h3>

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
            <h3>Exchange Rules</h3>
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