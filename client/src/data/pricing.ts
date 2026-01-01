import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "50 AI thumbnails per month",
            "Basic templates",
            "Standard image quality",
            "No watermark",
            "Email support",
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "500 AI thumbnails per month",
            "Premium templates",
            "Upto 4k image quality",
            "No watermark",
            "Priority support",
            'Brand kit integration with AI',
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Every feature of Pro +",
            'API access',
            "Team collaboration",
            'Custom branding',
            "Dedicated support",             
              
        ],
        mostPopular: false
    }
];