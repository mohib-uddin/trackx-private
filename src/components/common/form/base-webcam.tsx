import { Button } from "@nextui-org/button";
import { useCallback, useRef } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import Webcam, { WebcamProps } from "react-webcam";

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type Props<T extends FieldValues> = {
  name: string;
} & WithRequiredProperty<UseControllerProps<T>, "control">;
function BaseWebcam<T extends FieldValues>({
  control,
  name,
  rules = {},
}: Props<T>) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules,
  });
  const webcamRef = useRef<Webcam>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    onChange(imageSrc);
  }, [webcamRef]);
  const retake = () => {
    onChange(null);
  };
  return (
    <div className="container">
      {value ? (
        <img src={value} alt="webcam" />
      ) : (
        <Webcam
          screenshotFormat="image/jpeg"
          screenshotQuality={0.8}
          height={500}
          width={500}
          ref={webcamRef}
        />
      )}
      <div className="mt-4">
        {value ? (
          <Button color={"primary"} type={"button"} onClick={retake}>
            Retake photo
          </Button>
        ) : (
          <Button color={"primary"} type={"button"} onClick={capture}>
            Capture photo
          </Button>
        )}
      </div>
    </div>
  );
}
export default BaseWebcam;
