import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useClientRouterPrefetch = (routes: string[]) => {
  const router = useRouter();
  useEffect(() => {
    routes.forEach((e) => {
      router.prefetch(e);
    });
  }, [router]);
};
export default useClientRouterPrefetch;
