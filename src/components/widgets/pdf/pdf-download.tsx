"use client";
import { Spinner } from "@nextui-org/spinner";
import { DocumentProps, PDFDownloadLink } from "@react-pdf/renderer";
import {
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { MdOutlineFileDownload } from "react-icons/md";

export default function GeneratePDF({
  children,
  filename,
}: {
  children: ReactElement<DocumentProps, string | JSXElementConstructor<any>>;
  filename: string;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className={"font-[600]"}>
          <PDFDownloadLink document={children} fileName={`${filename}.pdf`}>
            {({ loading }) =>
              loading ? <Spinner /> : <MdOutlineFileDownload size={25} />
            }
          </PDFDownloadLink>
        </div>
      ) : (
        <span>...Loading</span>
      )}
    </>
  );
}
