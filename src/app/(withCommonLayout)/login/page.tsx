"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";

import loginValidationSchema from "@/src/schemas/login.schema";
import { useUserLogin } from "@/src/hooks/auth.hook";
import PCInput from "@/src/components/form/PCInput";
import PCForm from "@/src/components/form/PCForm";
import { useUser } from "@/src/context/user.provider";

const LoginPage = () => {
  const { mutate: handleUserLogin } = useUserLogin();
  const { setIsLoading: userLogin } = useUser();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    handleUserLogin(userData, {
      onSuccess: () => {
        router.push("/");
        userLogin(true);
      },
    });
  };

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center bg-[#101214] rounded-lg">
      <h3 className="my-2 text-2xl font-bold ">Welcome Back</h3>
      <p>Login with pet-care</p>

      <div className="">
        <PCForm
          resolver={zodResolver(loginValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <PCInput name="email" placeholder="Email" type="email" />
          </div>
          <div className="py-3">
            <PCInput name="password" placeholder="Password" type="password" />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-black"
            type="submit"
          >
            Login
          </Button>
        </PCForm>

        <div className="text-center">
          Don't already have an account?{" "}
          <Link className="underline" href={"/register"}>
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
