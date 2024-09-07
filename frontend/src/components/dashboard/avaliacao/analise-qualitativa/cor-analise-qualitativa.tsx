"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CorAnaliseQualitativaProps {
  content: string;
}

export function CorAnaliseQualitativa({ content }: CorAnaliseQualitativaProps) {
  const [selectedTab, setSelectedTab] = useState("vermelho");

  const triggerClasses = (baseColor: string, rounded: string) =>
    clsx(
      "relative",
      "w-full",
      "max-h-8",
      "flex items-center justify-center",
      rounded,
      `bg-${baseColor}-500`,
      `data-[state=active]:bg-${baseColor}-500`,
    );

  const Indicator = ({ color }: { color: string }) => (
    <div className={clsx("absolute w-6 h-6 bg-white rounded-full", `border-2 border-${color}-500`)} />
  );

  return (
    <>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <div className="mb-4">
          <Label className="mb-2">Valor</Label>
          <Input type="number" placeholder="0" defaultValue={0} min={0} />
        </div>
        <TabsContent value="vermelho">
          <div className="p-4 bg-red-100 border-2 border-red-500 rounded-md">
            <p className="text-red-800">{content}</p>
          </div>
        </TabsContent>
        <TabsContent value="amarelo">
          <div className="p-4 bg-yellow-100 border-2 border-yellow-500 rounded-md">
            <p className="text-yellow-800">{content}</p>
          </div>
        </TabsContent>
        <TabsContent value="verde">
          <div className="p-4 bg-green-100 border-2 border-green-500 rounded-md">
            <p className="text-green-800">{content}</p>
          </div>
        </TabsContent>
        <TabsList className="rounded-full flex justify-between bg-transparent">
          <TabsTrigger value="vermelho" className={triggerClasses("red", "rounded-full rounded-r-none")}>
            {selectedTab === "vermelho" && <Indicator color="red" />}
          </TabsTrigger>
          <TabsTrigger value="amarelo" className={triggerClasses("yellow", "rounded-none")}>
            {selectedTab === "amarelo" && <Indicator color="yellow" />}
          </TabsTrigger>
          <TabsTrigger value="verde" className={triggerClasses("green", "rounded-full rounded-l-none")}>
            {selectedTab === "verde" && <Indicator color="green" />}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
