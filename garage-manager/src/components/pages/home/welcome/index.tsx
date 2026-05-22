import { LuBuilding2 } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";

export interface WelcomeContentProps {
  onClickGarage: () => void;
}

export function WelcomeContent({ onClickGarage }: WelcomeContentProps) {
  return (
    <div className="w-3/4">
      <h1 className="text-4xl font-semibold mb-8 text-(--text-title)">
        Bem-vindo ao Portal Estapar B2B
      </h1>
      <h2 className="text-xl mb-8">
        Gerencie seus serviços de estacionamento, acesse relatórios, configure
        credenciados e contrate planos de mensalidade em um só lugar.
      </h2>
      <button onClick={onClickGarage}>
        <div className="box-border w-full flex flex-row bg-white border-[1px] border-gray-200 rounded-lg shadow-xs p-6 justify-center items-start hover:cursor-pointer hover:bg-gray-100">
          <div className="flex flex-col items-start space-y-2">
            <LuBuilding2 className="h-12 w-12 inline-block mr-2 text-(--estapar-green)" />
            <h3 className="text-lg font-semibold text-(--text-title)">
              Garagens
            </h3>
            <p className="text-base">
              Veja a lista de garagens disponíveis e suas configurações.
            </p>
          </div>
          <div className="ml-16">
            <FaArrowRight className="h-4 w-4 inline-block ml-2 text-(--foreground)" />
          </div>
        </div>
      </button>
    </div>
  );
}
