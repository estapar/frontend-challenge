import { DashBoardBoxCard } from "@/components/dashboard-box";
import { LuBuilding2 } from "react-icons/lu";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-white p-16">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-800">
          Bem-vindo ao Portal Estapar B2B
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Gerencie seus serviços de estacionamento, acesse relatórios, configure
          credenciados e contrate planos de mensalidade em um só lugar.
        </p>
      </header>

      <main>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashBoardBoxCard
            icon={LuBuilding2}
            title="Garagens"
            description="Veja a lista de garagens disponíveis e suas configurações."
            link="/garages"
          />
        </div>
      </main>
    </div>
  );
}
