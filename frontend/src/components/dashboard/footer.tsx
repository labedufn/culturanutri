export function Footer() {
  const date = new Date();

  return (
    <div className="supports-backdrop-blur:bg-background/60 z-20 w-full shadow bg-background/95 backdrop-blur">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-xs leading-loose text-muted-foreground text-left">
          &copy; {date.getFullYear()} LABED - Laboratório de Eletrônica e Desenvolvimento
        </p>
      </div>
    </div>
  );
}
