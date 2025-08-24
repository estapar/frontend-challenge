import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { LoginBody, authenticate } from "@/services/login";
import { setToken } from "@utils/handleToken";

export function LoginForm() {
  const router = useRouter();

  const [credentials, setCredentials] = useState<LoginBody>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const notify = (message: string) => {
    toast(message, {
      className: "!bg-red-600 !text-white",
    });
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const { username = "", password = "" } = credentials;

    if (password.length < 6) {
      notify("A senha deve ter no mínimo 6 caracteres!");
      return;
    }

    const loginBody = {
      username,
      password,
    };
    const { data, error } = await authenticate(loginBody);

    if (data) {
      setToken(data.token, data.expiredIn);
      router.push("/");
    } else {
      toast.clearWaitingQueue();
      toast.dismiss();

      error?.map((err) => notify(`${err.codigo} - ${err.mensagem}`));
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1 className="text-lg font-semibold mb-8">
          Entre com suas credenciais para acessar o sistema
        </h1>
        <label htmlFor="username" className="block mb-2 font-bold text-black">
          Usuário
        </label>
        <input
          name="username"
          onChange={handleChange}
          placeholder="Digite seu usuário"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <label
          htmlFor="password"
          className="block mt-8 mb-2 font-bold text-black"
        >
          Senha
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Digite sua senha"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <button className="mt-8 bg-(--estapar-green) text-white rounded-md p-2 w-full hover:cursor-pointer">
          Entrar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
