"use client";

import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { listarEstabelecimentos } from "@/actions/listar-estabelecimentos";
import { currentUserId } from "@/scripts/currentUserId";
import { ModalCadastrarEstabelecimento } from "../dashboard/estabelecimentos/modal-cadastrar-estabelecimento";
import { Button } from "../ui/button";
import { Toaster } from "../ui/toaster";

interface AvaliacaoInfosProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoInfos({ onFormValidation }: AvaliacaoInfosProps) {
  const [estabelecimentos, setEstabelecimentos] = useState<any[]>([]);
  const [estabelecimento, setEstabelecimento] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchEstabelecimentos = async () => {
    const result = await listarEstabelecimentos();
    if (result.success) {
      setEstabelecimentos(result.data.estabelecimentos);
    } else {
      console.error(result.message);
    }
  };

  useEffect(() => {
    fetchEstabelecimentos();
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setEstabelecimento(localStorage.getItem("id_estabelecimento") || "");
        } else {
          localStorage.clear();
          localStorage.setItem("userId", id);
        }
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("id_estabelecimento", estabelecimento || "");
      onFormValidation(!!estabelecimento);
    }
  }, [userId, estabelecimento, onFormValidation]);

  useEffect(() => {
    onFormValidation(!!estabelecimento);
  }, [estabelecimento, onFormValidation]);

  return (
    <>
      <div>
        <div className="mb-2 text-muted-foreground">
          <Label>Estabelecimento para avaliação</Label>
        </div>
        <Select value={estabelecimento || ""} onValueChange={setEstabelecimento}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {estabelecimentos.map((estabelecimento) => (
                <SelectItem key={estabelecimento.id} value={estabelecimento.id}>
                  {estabelecimento.nome}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ModalCadastrarEstabelecimento
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={() => {
          setIsCreateModalOpen(false);
          fetchEstabelecimentos();
        }}
      />
      <div>
        <p className="mt-4 text-muted-foreground">Não encontrou o estabelecimento que deseja avaliar?</p>
        <Button className="mt-4 w-full md:max-w-96" onClick={() => setIsCreateModalOpen(true)}>
          Cadastrar Novo Estabelecimento
        </Button>
      </div>
      <Toaster />
    </>
  );
}