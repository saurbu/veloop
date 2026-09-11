import { Gem, Gift, FileCheck, ShieldCheck, Coins } from "lucide-react";
import "../css/work.css";

const Work = () => {
  const steps = [
    // {
    //   number: "01",
    //   title: "Earn Gems",
    //   desc: "Complete tasks and watch ads",
    //   icon: <Gem />,
    //   type: "purple"
    // },
    {
      number: "01",
      title: "Choose",
      desc: "Select a conversion that suits you",
      icon: <Gift />,
      type: "purple"
    },
    {
      number: "02",
      title: "Review",
      desc: "Check the details before confirming",
      icon: <FileCheck />,
      type: "purple"
    },
    {
      number: "03",
      title: "Confirm",
      desc: "Confirm to convert your Gems",
      icon: <ShieldCheck />,
      type: "green"
    },
    {
      number: "04",
      title: "Receive",
      desc: "VEs will be added to your balance",
      icon: <Coins />,
      type: "gold"
    }
  ];

  return (
    <div className="cont">
      <h2>How Exchange Works</h2>

      <div className="work-steps">
        {steps.map((step, index) => (
          <div className="work-step" key={step.number}>
            <div className={`step-icon ${step.type}`}>
              {step.icon}
            </div>
            <div>
              <h3>{step.number} {step.title}</h3>
              <p>{step.desc}</p>
            </div>

            {index < steps.length - 1 && (
              <div className="step-arrow">
                <span></span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;