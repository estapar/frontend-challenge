import Link from "next/link";

import { ArrowRight } from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

type Props = {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
};

export function DashboardFeatureCard({
    title,
    description,
    href,
    icon,
}: Props) {
    return (
        <Link href={href}>
            <Card
                className="
    border border-zinc-200
    transition-all duration-300
    hover:scale-[1.02]
    hover:shadow-md
  "
            >
                <CardContent className="relative p-8">
                    <ArrowRight
                        className="
              absolute right-8 top-8
              size-5 text-zinc-300
            "
                    />

                    <div className="text-[#7ad33e]">
                        {icon}
                    </div>

                    <div className="mt-8 space-y-3">
                        <h3 className="text-2xl font-semibold text-zinc-950">
                            {title}
                        </h3>

                        <p className="text-md text-zinc-600">
                            {description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}