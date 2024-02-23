import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { toast } from "sonner";

const MEDIA_BASEURL = "/";

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type selectedImageType =
  | {
      isMultiple?: false;
      selectedImage: undefined | null | File;
    }
  | {
      isMultiple?: true;
      selectedImage: undefined | null | File[];
    };
type Props<T extends FieldValues> = {
  name: string;
  inputvalue: undefined | any;
  label: string;
  imageUrl?: string;
} & selectedImageType &
  WithRequiredProperty<UseControllerProps<T>, "control">;
type PhotoPreviewPropType =
  | {
      selectedImage: undefined | File | null;
      isMultiple: false;
      imageUrl?: string;
    }
  | {
      selectedImage: undefined | File[] | null;
      isMultiple: true;
      imageUrl?: string;
    };
const PhotoPreview = ({
  selectedImage,
  isMultiple,
  imageUrl,
}: PhotoPreviewPropType) => {
  if (!selectedImage && imageUrl) {
    return (
      <img
        src={`${MEDIA_BASEURL}${imageUrl}`}
        alt="User"
        className="m-auto w-48 h-48"
      />
    );
  } else if (!selectedImage || (isMultiple && selectedImage.length < 0)) {
    return (
      <div className="flex flex-col items-center border-stone-500 justify-center space-y-3 min-h-[250px]">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white">
          <MdOutlineDriveFolderUpload />
        </span>
        <p>Click to Upload or drag and drop</p>
        <p className="mt-1.5 text-sm text-[#95989F] ">
          Only JPG,PNG format Allowed
        </p>
      </div>
    );
  }

  return (
    <>
      {!isMultiple ? (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="User"
          className="m-auto w-48 h-48"
        />
      ) : (
        selectedImage.map((el, index) => (
          <img
            key={index}
            src={URL.createObjectURL(el)}
            alt="User"
            className="m-auto w-48 h-48"
          />
        ))
      )}
      <p className="text-center mt-4">Change Image</p>
    </>
  );
};
const BaseFile = <T extends FieldValues>({
  control,
  name,
  rules = {},
  inputvalue,
  imageUrl,
  selectedImage,
  label,
  isMultiple = false,
}: Props<T>) => {
  const {
    field: { onChange: fieldOnChange, value },
    fieldState: { error },
  } = useController<T>({ name, control, rules });
  return (
    <div className={`flex flex-col items-center w-full sm:w-1/2 mt-7`}>
      <div className={"w-full"}>
        <label
          className="mb-3 block text-xs text-default-600"
          htmlFor="productName"
        >
          {label}
        </label>
        <div
          id="FileUpload"
          className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-default-200] bg-transparent py-4 px-4 sm:py-7.5"
        >
          {isMultiple && (
            <div className="flex flex-col gap-2.5">
              <PhotoPreview
                selectedImage={selectedImage as File[] | null | undefined}
                isMultiple={isMultiple}
                imageUrl={imageUrl}
              />
            </div>
          )}
          {!isMultiple && (
            <PhotoPreview
              selectedImage={selectedImage as File | null | undefined}
              isMultiple={isMultiple}
              imageUrl={imageUrl}
            />
          )}
          <>
            <div>
              <input
                ref={null} // Pass the inputRef as a ref to the input element
                type="file"
                name={name}
                multiple={isMultiple}
                onChange={(e) => {
                  const files = e.target.files;
                  if (!isMultiple) {
                    if (files && files.length > 0) {
                      fieldOnChange(files[0]);
                    } else {
                      if (inputvalue) {
                        fieldOnChange(inputvalue);
                      }
                    }
                  } else {
                    if (files && files.length > 0) {
                      if (
                        selectedImage &&
                        Array.isArray(selectedImage) &&
                        selectedImage.length + files.length > 5
                      ) {
                        toast.info("Max 5 Files Are Allowed");
                        return;
                      }
                      if (!selectedImage && files.length > 5) {
                        toast.info("Max 5 Files Are Allowed");
                        return;
                      }
                      fieldOnChange(Array.from(files).map((el) => el));
                    } else {
                      if (inputvalue) {
                        fieldOnChange(inputvalue);
                      }
                    }
                  }
                }}
                placeholder={`Enter your ${name}`}
                accept="image/*"
                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              />
            </div>
            {error && (
              <p className="text-danger text-tiny absolute -bottom-8 left-0">
                {error.message || "Error"}
              </p>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default BaseFile;
