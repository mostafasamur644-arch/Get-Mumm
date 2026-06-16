interface WaveDividerProps {
  fill: string;
  bg?: string;
  flip?: boolean;
  height?: number;
}

export function WaveDivider({ fill, bg, flip = false, height = 72 }: WaveDividerProps) {
  return (
    <div
      className="relative w-full leading-[0] block pointer-events-none"
      style={{ height, backgroundColor: bg ?? "transparent" }}
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height, fill, transform: flip ? "scaleX(-1)" : undefined }}
      >
        <path d="M0,40 C180,72 360,8 540,40 C720,72 900,8 1080,40 C1260,72 1380,52 1440,40 L1440,72 L0,72 Z" />
      </svg>
    </div>
  );
}
