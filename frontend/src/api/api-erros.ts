export function apiErro(error: unknown): string | undefined {
  if (error && typeof error === "object" && "response" in error && error.response) {
    const axiosError = error as { response: { data: { error?: string }; statusText?: string } };
    if (axiosError.response.data && axiosError.response.data.error) {
      return axiosError.response.data.error;
    } else if (axiosError.response.statusText) {
      return axiosError.response.statusText;
    }
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "Ocorreu um problema no servidor.";
  }
  return undefined;
}
