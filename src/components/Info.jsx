import { ShieldCheck, Zap, RefreshCw, Headphones, ChevronDown,Gem } from "lucide-react";
import "../css/info.css";

const Info = () => {
    const infoItems = [
        {
            title: "Secure & Trusted",
            description: "All conversions are safe, secure and processed instantly.",
            icon: ShieldCheck,
            color: "purple"
        },
        {
            title: "Instant Credit",
            description: "VEs will be added to your account immediately after conversion.",
            icon: Zap,
            color: "gold"
        },
        {
            title: "One-way Conversion",
            description: "Once converted, Gems cannot be reversed.",
            icon: RefreshCw,
            color: "purple"
        },
        {
            title: "Need Help?",
            description: "Contact our support team for any assistance.",
            icon: Headphones,
            color: "blue"
        }
    ];

    return (
        <div className="conversion-info-wrapper">
            <div className="conversion-info-desktop">
                <div className="conversion-info-card">
                    {infoItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div className="conversion-info-item" key={item.title}>
                                <div className={`conversion-info-icon ${item.color}`}>
                                    <Icon size={27} strokeWidth={2} />
                                </div>
                                <div className="conversion-info-content">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                                {index < infoItems.length - 1 && (
                                    <div className="conversion-info-divider" />
                                )}
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
                                <span></span>
                            </div>

                            <h3>Conversion Information</h3>
                        </div>

                        <ChevronDown size={24} />
                    </summary>
                    <div className="conversion-info-list">
                        {infoItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div className="conversion-info-mobile-item" key={item.title}>
                                    <div className={`conversion-info-icon ${item.color}`}>
                                        <Icon size={24} strokeWidth={2} />
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