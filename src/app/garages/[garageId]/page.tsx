import { GarageDetailsPage } from "@/src/features/garages/GarageDetailsPage";

type GarageDetailsRouteProps = {
  params: {
    garageId: string;
  };
};

export default function GarageDetailsRoute({
  params,
}: GarageDetailsRouteProps) {
  return <GarageDetailsPage garageId={params.garageId} />;
}
