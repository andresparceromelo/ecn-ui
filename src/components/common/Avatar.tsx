interface Props {
  src?: string | null;
  name: string;
  size?: number;
}

function hashToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % 360);
}

export function Avatar({ src, name, size = 40 }: Props) {
  const initial = name.charAt(0).toUpperCase();
  const hue = hashToHue(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `hsl(${hue}, 50%, 45%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 700,
        fontSize: size * 0.42,
        lineHeight: 1,
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {initial}
    </div>
  );
}
