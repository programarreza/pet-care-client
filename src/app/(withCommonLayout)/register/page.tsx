"use client";

import PCForm from "@/src/components/form/PCForm";
import PCInput from "@/src/components/form/PCInput";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";

const RegisterPage = () => {
  const { mutate: handleUserRegistration } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    const jsonData = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
    };

    formData.append("data", JSON.stringify(jsonData));
    formData.append("image", data.image);

    // Send the formData
    handleUserRegistration(formData);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold ">Register with Pet-Care</h3>
      <p>Welcome to pet-care</p>

      <div className="w-[35%]">
        <PCForm
          //! Only for development
          defaultValues={{
            name: "Reza",
            email: "reza@gmail.com",
            phone: "01711223344",
            password: "123456",
            address: "barisal",
          }}
          onSubmit={onSubmit}
          resolver={zodResolver(registerValidationSchema)}
        >
          <div className="py-3">
            <PCInput name="name" type="text" placeholder="Name" />
          </div>
          <div className="py-3">
            <PCInput name="email" type="email" placeholder="Email" />
          </div>
          <div className="py-3">
            <PCInput name="phone" type="text" placeholder="Mobile Number" />
          </div>
          <div className="py-3">
            <PCInput name="password" type="password" placeholder="Password" />
          </div>
          <div className="py-3">
            <PCInput name="address" type="text" placeholder="Address" />
          </div>
          <div className="py-3">
            <Controller
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  type="file"
                  value={value?.fileName}
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0])}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-black"
          >
            Register
          </Button>
        </PCForm>

        <div className="text-center">
          Already have an account? <Link href={"/login"}>Login Now</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
