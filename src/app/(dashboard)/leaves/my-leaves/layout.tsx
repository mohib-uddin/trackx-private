export default function Layout(props: {
  children: React.ReactNode;
  singleleave: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.singleleave}
    </>
  );
}
