import { useEffect, useState } from "react";
import provinceCategory from "./provinceCategory";
import countryName, { CountryName } from "../services/countryName";
import ErrorMessage from "../utils/ErrorMessage";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  onSubmit: (data: FormData) => void;
  editId: number | null;
  currentData: FormData | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: string;
}

const ACCEPTED_IMAGE_TYPES = ".image/png";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  number: z.string().regex(/^\d{7,10}$/, {
    message: "Phone number must be between 7 and 10 digits.",
  }),
  date: z.string().min(1, { message: "Date is required" }),
  city: z.string().min(1, { message: "City is required." }),
  district: z.string().min(1, { message: "District is required." }),
  province: z.enum(provinceCategory, {
    errorMap: () => ({ message: "Province is required" }),
  }),
  country: z.string(),
  picture: z
    .any()
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: "Only .png formats are supported.",
    }),
});

export type FormData = z.infer<typeof schema>;

const UserForm = ({ onSubmit, editId, currentData, onInputChange, file }: Props) => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [countries, setCountries] = useState<CountryName[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    countryName
      .getAllCountryName()
      .then((res) => {
        setCountries(res.data);
        const nepal = res.data.find(
          (country) => country.name.common === "Nepal"
        );
        if (nepal) {
          setSelectedCountry(nepal.name.common);
          setValue("country", nepal.name.common);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, [setValue]);

  useEffect(() => {
    if (currentData) {
      setValue("name", currentData.name);
      setValue("email", currentData.email);
      setValue("number", currentData.number);
      setValue("date", currentData.date);
      setValue("city", currentData.city);
      setValue("district", currentData.district);
      setValue("province", currentData.province);
      setValue("country", currentData.country);
      setValue("picture", currentData.picture);
    } else {
      reset();
    }
  }, [currentData, setValue, reset]);

  return (
    <section className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        className="p-6 bg-white rounded drop-shadow-lg"
      >
        <div className="mb-3">
          <label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="mb-3">
          <label htmlFor="email">
            Email
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="text"
            id="email"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="mb-3">
          <label htmlFor="number">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register("number")}
            type="text"
            id="number"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.number && (
            <ErrorMessage>{errors.number.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="date">DOB</label>
          <input
            {...register("date")}
            type="date"
            id="date"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            {...register("city")}
            type="text"
            id="city"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            District
          </label>
          <input
            {...register("district")}
            type="text"
            id="district"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.district && (
            <ErrorMessage>{errors.district.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="province">Province</label>
          <select
            {...register("province")}
            id="province"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value=""></option>
            {provinceCategory.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.province && (
            <ErrorMessage>{errors.province.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            {...register("country")}
            id="country"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map((country) => (
              <option key={country.name.common} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {errors.country && (
            <ErrorMessage>{errors.country.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="picture">Profile Picture</label>
          <input
            {...register("picture")}
            type="file"
            id="picture"
            onChange={onInputChange}
          />
          {file && (
            <img
              src={file}
              alt="Upload Preview"
              className="w-[100px] h-[100px] rounded-[50%] object-cover"
            />
          )}
          {errors.picture && (
            <ErrorMessage>{errors.picture.message as string}</ErrorMessage>
          )}
        </div>

        <button className="bg-blue-500 rounded-lg text-white text-base w-full px-4 py-2 hover:bg-white hover:text-customBlue hover:border hover:border-customBlue transition-all duration-200 ease-in-out">
          {editId ? "Update" : "Save"}
        </button>
      </form>
    </section>
  );
};

export default UserForm;
