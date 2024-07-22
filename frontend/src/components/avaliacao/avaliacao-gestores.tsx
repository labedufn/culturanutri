import { Separator } from "../ui/separator";
import { AvaliacaoGestoresComprometimentoAfetivo } from "./gestores/avaliacao-gestores-comprometimento-afetivo";
import { AvaliacaoGestoresComprometimentoInstrumental } from "./gestores/avaliacao-gestores-comprometimento-instrumental";
import { AvaliacaoGestoresComprometimentoNormativo } from "./gestores/avaliacao-gestores-comprometimento-normativo";
import { AvaliacaoGestoresConhecimento } from "./gestores/avaliacao-gestores-conhecimento";
import { AvaliacaoGestoresDadosIndividuais } from "./gestores/avaliacao-gestores-dados-individuais";
import { AvaliacaoGestoresPercepcaoRisco } from "./gestores/avaliacao-gestores-percepcao-risco";
import { AvaliacaoGestoresSistemaGestao } from "./gestores/avaliacao-gestores-sistema-gestao";

export function AvaliacaoGestores() {
  return (
    <>
      <AvaliacaoGestoresDadosIndividuais />
      <Separator className="my-8" />
      <AvaliacaoGestoresConhecimento />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoAfetivo />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoNormativo />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoInstrumental />
      <Separator className="my-8" />
      <AvaliacaoGestoresPercepcaoRisco />
      <Separator className="my-8" />
      <AvaliacaoGestoresSistemaGestao />
    </>
  );
}
