interface BaseHeaderType {
  title: string;
}

export default function BaseHeader({ title }: BaseHeaderType) {
  return <h3 className="main-page-heading ">{title}</h3>;
}
