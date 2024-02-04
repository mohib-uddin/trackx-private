export default function Layout(props: {
  children: React.ReactNode;
  employees: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.employees}
    </>
  );
}
