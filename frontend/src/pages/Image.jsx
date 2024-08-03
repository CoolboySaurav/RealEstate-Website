export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'http://localhost:3500/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }