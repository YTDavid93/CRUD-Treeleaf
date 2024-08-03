import { useEffect, useState } from "react";
import provinceCategory from "./provinceCategory";
import countryName, { CountryName } from "../services/countryName";
import { useForm } from "react-hook-form";

const UserForm = () => {
  const { setValue } = useForm();

  const [countries, setCountries] = useState<CountryName[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [error, setError] = useState("");
  const [file, setFile] = useState<string>();

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
          setValue("name", nepal.name.common);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, [setValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(URL.createObjectURL(files[0]));
    }
  };

  return (
    <section>
      <form>
        <div>
          <label
            htmlFor="name"
            // className="block text-sm font-medium text-gray-700"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label htmlFor="email">
            Email
            <span className="text-red-500">*</span>
          </label>
          <input
            // {...register("email")}
            type="text"
            id="email"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label
            htmlFor="number"
            // className="block text-sm font-medium text-gray-700"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            // {...register("number")}
            type="text"
            id="number"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            // className="block text-sm font-medium text-gray-700"
          >
            DOB
          </label>
          <input
            // {...register("date")}
            type="date"
            id="date"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            // {...register("city")}
            type="text"
            id="city"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {/* {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>} */}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            District
          </label>
          <input
            // {...register("district")}
            type="text"
            id="district"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
          {/* {errors.district && (
            <ErrorMessage>{errors.district.message}</ErrorMessage>
          )} */}
        </div>

        <div>
          <label htmlFor="province">Province</label>
          <select
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
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            // {...register("country")}
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
          {/* {errors.country && (
            <ErrorMessage>{errors.country.message}</ErrorMessage>
          )} */}
        </div>

        <div>
          <label htmlFor="picture">Profile Picture</label>
          <input type="file" id="picture" onChange={handleChange} />
          {file && (
            <img
              src={file}
              alt="Upload Preview"
              className="w-[100px] h-[100px] rounded-[50%] object-cover"
            />
          )}
        </div>
        <button className="bg-blue-500 rounded-lg text-white text-base w-full px-4 py-2 hover:bg-white hover:text-customBlue hover:border hover:border-customBlue transition-all duration-200 ease-in mt-3">
          Save
        </button>
      </form>
    </section>
  );
};

export default UserForm;
