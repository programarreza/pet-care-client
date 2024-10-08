import { Button } from "@nextui-org/button";
import Link from "next/link";

import PCModal from "./PCModel";

interface IProps {
  buttonText: string;
}

const AuthenticationModal = ({ buttonText }: IProps) => {
  return (
    <PCModal
      buttonClassName="flex-1"
      buttonText={buttonText}
      title="Authentication"
    >
      <div>You are not currently logged in. Please login first to continue</div>
      <div className="flex mt-2 mb-4 gap-2">
        <Link className="flex-1" href={`/register?redirect="/"`}>
          <Button className="w-full">Register</Button>
        </Link>
        <Link className="flex-1" href={`/login?redirect="/"`}>
          <Button className="w-full">Login</Button>
        </Link>
      </div>
    </PCModal>
  );
};

export default AuthenticationModal;
