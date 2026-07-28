import CyberCore from "./CyberCore";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* CAPA 0 (z-0): Retícula de puntos y fondo estático */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px] opacity-40 z-0" />

      {/* CAPA 1 (z-10): Núcleo 3D Interactivo */}
      <CyberCore />

      {/* CAPA 2 (z-20): Texto secundario del Midground */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <span className="text-zinc-600 text-sm tracking-[0.3em] font-mono uppercase">
          CREATIVE CODER // FULLSTACK
        </span>
      </div>

      {/* CAPA 3 (z-30): Texto gigante NUZZO e Interfaz HUD */}
      <div className="relative z-30 w-full h-full flex flex-col justify-between p-8">
        {/* Tu Header, Título "NUZZO" y Botones [CONTRACT // OPEN FOR HIRE] */}
      </div>
    </section>
  );
}