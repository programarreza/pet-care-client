"use client";

import PCForm from "@/src/components/form/PCForm";
import PCInput from "@/src/components/form/PCInput";
import { useUserLogin } from "@/src/hooks/auth.hook";
import loginValidationSchema from "@/src/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

const LoginPage = () => {
  const { mutate: handleUserLogin } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    console.log(userData);
    handleUserLogin(userData);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold ">Welcome Back</h3>
      <p>Login with pet-care</p>

      <div className="w-[35%]">
        <PCForm
          //! Only for development
          defaultValues={{
            email: "reza@gmail.com",
            password: "123456",
          }}
          onSubmit={onSubmit}
          resolver={zodResolver(loginValidationSchema)}
        >
          <div className="py-3">
            <PCInput name="email" type="email" placeholder="Email" />
          </div>
          <div className="py-3">
            <PCInput name="password" type="password" placeholder="Password" />
          </div>

          <Button
            type="submit"
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-black"
          >
            Login
          </Button>
        </PCForm>

        <div className="text-center">
          Don't already have an account?{" "}
          <Link className="underline" href={"/register"}>Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
