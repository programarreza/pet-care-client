import envConfig from "@/src/config/envConfig";

export const getContents = async () => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/contents`, fetchOptions);
  if (!res.ok) {
    throw new Error("Failed to fetch content data");
  }

  return res.json();
};
