async function converterBase64JSON(json: JSON): Promise<{ informacoes: string }> {
  try {
    // Converte o JSON em string
    const jsonString = JSON.stringify(json);
    // Converte a string para Base64
    const base64String = Buffer.from(jsonString).toString("base64");
    // Limita a string Base64 a 255 caracteres
    const limitedBase64String = base64String.slice(0, 255);
    // Retorna a string Base64
    return { informacoes: limitedBase64String };
  } catch (error) {
    console.error("Erro ao aplicar base64 no JSON:", error);
    return null;
  }
}

export default converterBase64JSON;
