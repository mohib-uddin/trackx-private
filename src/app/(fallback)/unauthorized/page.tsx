import { Button } from "@nextui-org/button";

const UnAuthorized = () => {
  return (
    <div className={"flex flex-col items-center justify-center h-[100vh]"}>
      <p className={"text-3xl font-[600] text-center"}>
        You Are Not Allowed To View This Page
      </p>
      <Button className={"mt-4"} color={"primary"}>
        Go Home
      </Button>
    </div>
  );
};
export default UnAuthorized;
