"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";

import registerValidationSchema from "@/src/schemas/register.schema";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import PCInput from "@/src/components/form/PCInput";
import PCForm from "@/src/components/form/PCForm";

const Register = () => {
  const { mutate: handleUserRegistration } = useUserRegistration();
  const router = useRouter();

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
    handleUserRegistration(formData, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center bg-[#101214] rounded-lg">
      <h3 className="my-2 text-2xl font-bold ">Register with Pet-Care</h3>
      <p>Welcome to pet-care</p>

      <div className="">
        <PCForm
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <PCInput name="name" placeholder="Name" type="text" />
          </div>
          <div className="py-3">
            <PCInput name="email" placeholder="Email" type="email" />
          </div>
          <div className="py-3">
            <PCInput name="phone" placeholder="Mobile Number" type="text" />
          </div>
          <div className="py-3">
            <PCInput name="password" placeholder="Password" type="password" />
          </div>
          <div className="py-3">
            <PCInput name="address" placeholder="Address" type="text" />
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
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-black"
            type="submit"
          >
            Register
          </Button>
        </PCForm>

        <div className="text-center">
          Already have an account?{" "}
          <Link className="underline" href={"/login"}>
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
