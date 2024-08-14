import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelecionarEstabelecimento } from "./selecionar-estabelecimento";
import { CadastrarEstabelecimento } from "./cadastrar-estabelecimento";

export function EstabelecimentoTabs() {
  return (
    <Tabs defaultValue="selecionar" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="selecionar">Selecionar</TabsTrigger>
        <TabsTrigger value="cadastrar">Cadastrar</TabsTrigger>
      </TabsList>
      <TabsContent value="selecionar">
        <SelecionarEstabelecimento />
      </TabsContent>
      <TabsContent value="cadastrar">
        <CadastrarEstabelecimento />
      </TabsContent>
    </Tabs>
  );
}
