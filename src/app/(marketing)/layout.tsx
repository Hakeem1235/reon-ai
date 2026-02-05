import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reon.ai - AI-Powered E-commerce Automation",
    description: "8 AI agents working 24/7 to grow your e-commerce brand. From ads to emails, SEO to social — let AI handle it while you focus on what matters.",
};

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
