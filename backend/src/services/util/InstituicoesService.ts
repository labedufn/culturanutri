import fs from "fs";
import path from "path";
import csv from "csv-parser";

interface Instituicoes {
  name: string;
}

const filePath = path.resolve(__dirname, "./PDA_Lista_Instituicoes_Ensino_Superior_do_Brasil_EMEC.csv");

export class InstituicoesService {
  async execute(): Promise<Instituicoes[]> {
    return new Promise((resolve, reject) => {
      const results: Instituicoes[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          results.push({
            name: data.NOME_DA_IES,
          });
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}
