import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "bordered" | "flat" | "faded" | "underlined";
  size?: "md" | "sm" | "lg";
  required?: boolean;
  type?: "text" | "email" | "password";
  label?: ReactNode;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface IContent {
  _id: string;
  user: IUser;
  content: string;
  image: string;
  category: string;
  contentType: string;
  upVote: any[];
  downVote: any[];
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  image: string;
  status: string;
  flowers: any[];
  flowing: any[];
  isBlock: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
