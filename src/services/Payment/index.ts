"use server";

import envConfig from "@/src/config/envConfig";

export const getPayments = async () => {
  const fetchOptions = {
    next: {
      tags: ["payments"],
    },
  };

  const res = await fetch(`${envConfig.baseApi}/payments`, fetchOptions);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
