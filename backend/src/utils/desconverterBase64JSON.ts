export default async function desconverterBase64JSON(base64String: string): Promise<JSON> {
  try {
    // Decode Base64 string
    const jsonString = Buffer.from(base64String, "base64").toString("utf-8");
    // Parse JSON string
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Erro ao decodificar Base64 para JSON:", error);
    return null;
  }
}
