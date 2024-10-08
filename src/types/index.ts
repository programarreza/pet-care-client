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
  upVote: string[];
  downVote: string[];
  totalVote: number;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUser {
  id?: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  image: string;
  status: string;
  followers: any[];
  following: any[];
  isDeleted?: boolean;
  isBlock?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IComment {
  _id: string;
  comment: string;
  content: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
}

export interface IPayment {
  _id: string;
  user: IUser;
  paymentStatus: PaymentStatus;
  paymentAmount: number;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};
