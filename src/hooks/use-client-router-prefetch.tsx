import { useEffect } from "react";

import { useRouter } from "@/_utils/locale/navigation";

const useClientRouterPrefetch = (routes: string[]) => {
  const router = useRouter();
  useEffect(() => {
    routes.forEach((e) => {
      router.prefetch(e);
    });
  }, [router]);
};
export default useClientRouterPrefetch;
