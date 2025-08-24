import { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import {
  getGarages,
  getGarageByCode,
  GarageItem,
  GarageItemExtended,
} from "@/services/garages";
import { GarageInfoModal } from "@components/layout/GarageInfoModal";

export function GarageTable() {
  const [garages, setGarages] = useState<GarageItem[]>([]);
  const [garagesView, setGaragesView] = useState<GarageItem[]>([]);
  const [selectedGarage, setSelectedGarage] =
    useState<GarageItemExtended | null>(null);
  const [countRecords, setCountRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchGarages = async () => {
      setLoading(true);
      const { data, error } = await getGarages({
        currentPage: currentPage,
        pageSize: 5,
      });

      if (!error) {
        setGarages(data?.data || []);
        setCountRecords(data?.countRecords || 0);
      } else {
        console.error("Error fetching garages:", error);
      }

      setLoading(false);
    };

    setGarages([]);
    fetchGarages();
  }, [currentPage]);

  useEffect(() => {
    setGaragesView(garages);
  }, [garages]);

  const fetchGarageByCode = async (code: string) => {
    const { data, error } = await getGarageByCode(code);
    if (!error) {
      setSelectedGarage(data);
    } else {
      console.error("Error fetching garage:", error);
    }
  };

  const changePage = (change: number) => {
    setCurrentPage((prev) => {
      const newPage = prev + change;
      return newPage > 0 ? newPage : 1;
    });
  };

  const onActionClick = (code: string) => {
    fetchGarageByCode(code);
    setOpenModal(true);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGaragesView(
      garages.filter((garage) =>
        garage.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="border-2 border-gray-300 rounded-md flex flex-row items-center justify-between mb-4 p-4">
          <label className="flex items-center hover:cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="mr-3 h-5 w-5 hover:cursor-pointer"
            />
            <span className="font-semibold">Mensalista Digital</span>
          </label>
          <div>{countRecords} registros</div>
          <div>
            <input
              className="border-2 border-gray-300 rounded-md p-2"
              type="text"
              placeholder="Buscar por nome"
              onChange={onSearch}
            />
          </div>
        </div>
        <div>
          <div className="flex flow-row justify-end space-x-4 mr-2 text-sm">
            {currentPage > 1 ? (
              <button
                className="hover:underline hover:cursor-pointer"
                onClick={() => changePage(-1)}
              >
                Anterior ◄
              </button>
            ) : null}
            <span>Página {currentPage}</span>
            <button
              className="hover:underline hover:cursor-pointer"
              onClick={() => changePage(1)}
            >
              ► Próxima
            </button>
          </div>
          <div className="border-2 border-gray-300 border-collapse rounded-md pb-1">
            <table className="table-auto w-full text-left ">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="p-2">Código</th>
                  <th className="p-2">Nome</th>
                  <th className="p-2">Endereço</th>
                  <th className="p-2">Cidade/UF</th>
                  <th className="p-2">Regional</th>
                  <th className="p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  <>
                    {garagesView.map((garage, index) => (
                      <tr
                        key={index}
                        className="border-b-2 border-gray-300 text-black text-sm hover:bg-gray-100"
                      >
                        <td className="p-2">{garage.code}</td>
                        <td className="p-2">{garage.name}</td>
                        <td className="p-2">{garage.address}</td>
                        <td className="p-2">{`${garage.city} / ${garage.state}`}</td>
                        <td className="p-2">{garage.region}</td>
                        <td
                          className="p-2 flex flex-row hover:cursor-pointer justify-center"
                          onClick={() => onActionClick(garage.code)}
                        >
                          <FaRegEye className="h-6 w-6 inline-block" />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td className="p-2">Carregando...</td>
                    <td className="p-2">Carregando...</td>
                    <td className="p-2">Carregando...</td>
                    <td className="p-2">Carregando...</td>
                    <td className="p-2">Carregando...</td>
                    <td className="p-2">Carregando...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <GarageInfoModal
        garage={selectedGarage || undefined}
        isOpen={isModalOpen}
        onClose={() => {
          setSelectedGarage(null);
          setOpenModal(false);
        }}
      />
    </div>
  );
}
