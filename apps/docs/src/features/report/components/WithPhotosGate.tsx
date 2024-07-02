import { ElementType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReportStore } from "../../../store/useReportStore";

const WithPhotosGate = (Component: ElementType) => {
  const WithPhotosGateComponent = (props: any) => {
    const router = useRouter();
    const photos = useReportStore((store) => store.photos);

    useEffect(() => {
      if (photos.length === 0 || photos.some((file) => file === null)) {
        router.push("/");
      }
    }, [photos, router]);

    return <Component {...props} />;
  };

  return WithPhotosGateComponent;
};

export default WithPhotosGate;
