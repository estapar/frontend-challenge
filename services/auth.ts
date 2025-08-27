export const authService = {
    login: async (username:string, password:string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Authenticate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Erro ao fazer login");
      }
  
      if (result.data.token) {
        localStorage.setItem("authToken", result.data.token);
      }
  
      return result;
    },
  
    getToken: () => {
      return localStorage.getItem("authToken");
    },
  
    removeToken: () => {
      localStorage.removeItem("authToken");
    },
  };
  