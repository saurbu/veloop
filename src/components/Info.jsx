import { ShieldCheck, Zap, Users, ArrowRight, Gem } from "lucide-react";
import gem from "../assets/gems.png";
import "../css/info.css";

const Info = () => {
    const features = [
        {
            title: "Best exchange rates",
            description: "Always get more value",
            icon: ShieldCheck,
            color: "green"
        },
        {
            title: "Instant & Secure",
            description: "VEs credited instantly",
            icon: Zap,
            color: "gold"
        },
        {
            title: "Trusted by 10K+ users",
            description: "Join a growing community",
            icon: Users,
            color: "purple"
        }
    ];

    const benefits = [
        {
            title: "Secure & Trusted",
            description: "100% safe and secure",
            icon: ShieldCheck,
            color: "purple"
        },
        {
            title: "Instant Credit",
            description: "VEs added instantly",
            icon: Zap,
            color: "gold"
        },
        {
            title: "Best Value",
            description: "Get more for your Gems",
            icon: ShieldCheck,
            color: "blue"
        }
    ];

    return (
        <div className="conversion-info-wrapper">
            <div className="conversion-info-card">
                <div className="info-crystal-area">
                    <div className="info-crystal-glow"></div>

                    <img
                        className="info-gem-image"
                        src={gem}
                        alt="Gems"
                    />

                    <div className="crystal-orbit orbit-one"></div>
                    <div className="crystal-orbit orbit-two"></div>

                    <div className="crystal-spark spark-one"></div>
                    <div className="crystal-spark spark-two"></div>
                    <div className="crystal-spark spark-three"></div>
                    <div className="crystal-spark spark-four"></div>

                    <div className="crystal-mini crystal-mini-one">
                        <ShieldCheck size={15} />
                    </div>

                    <div className="crystal-mini crystal-mini-two">
                        <Zap size={15} />
                    </div>
                </div>

                <div className="info-main">
                    <span className="info-eyebrow">PREMIUM REWARDS</span>

                    <h2>
                        Unlock More.
                        <br />
                        <span>Earn More.</span>
                    </h2>

                    <p className="info-description">
                        Exchange your Gems smartly and unlock premium rewards.
                    </p>

                    <div className="info-features">
                        {features.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div className="info-feature" key={item.title}>
                                    <div className={`info-feature-icon ${item.color}`}>
                                        <Icon size={19} />
                                    </div>

                                    <div>
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button className="info-explore">
                        <span>Explore Rewards</span>
                        <ArrowRight size={20} />
                    </button>
                </div>

                <div className="info-benefits">
                    {benefits.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                className={`info-benefit ${item.color}`}
                                key={item.title}
                            >
                                <div className="info-benefit-icon">
                                    <Icon size={29} strokeWidth={2} />
                                </div>

                                <div className="info-benefit-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="conversion-info-mobile">
                <details className="conversion-info-dropdown">
                    <summary>
                        <div className="conversion-info-title">
                            <div className="conversion-info-logo">
                                <Gem size={19} />
                            </div>

                            <h3>Conversion Information</h3>
                        </div>

                        <ArrowRight size={20} />
                    </summary>

                    <div className="conversion-info-list">
                        {benefits.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    className="conversion-info-mobile-item"
                                    key={item.title}
                                >
                                    <div
                                        className={`conversion-info-icon ${item.color}`}
                                    >
                                        <Icon size={21} />
                                    </div>

                                    <div className="conversion-info-content">
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </details>
            </div>
        </div>
    );
};

export default Info;