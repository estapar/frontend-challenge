export class ApiClient {
    private baseUrl: string;
  
    constructor() {
      this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    }
  
    private getAuthHeaders() {
      const token = localStorage.getItem("authToken");
      if (!token)
        throw new Error("Token não encontrado. Você precisa estar logado.");
      return { Authorization: `Bearer ${token}` };
    }
  
    async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição GET: ${response.statusText}`);
      }
  
      return response.json();
    }
  
    async post<TRequest, TResponse>(
      endpoint: string,
      body: TRequest,
      options: RequestInit = {}
    ): Promise<TResponse> {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
          ...options.headers,
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição POST: ${response.statusText}`);
      }
  
      return response.json();
    }
  }