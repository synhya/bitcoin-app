import { AxiosRequestConfig } from "axios";
import { renderActiveShape } from "@/components/coin-page-specific/coin-chart-utils";

// enum
export const Theme = {
  dark: "dark",
  light: "light",
  system: "system",
};

type User = {
  name: string;
  age: string;
  gender?: string;
};

// 모든 프로퍼티가 옵션 프로퍼티로 변경됨
type PartialUser = Partial<User>;

// 모든 프로퍼티가 필수 프로퍼티로 변경됨
type RequiredUser = Required<User>;

type PickedUser = Pick<User, "name" | "age">;

type OmittedUser = Omit<User, "gender">;

const user3: PickedUser = {
  name: "sila",
  age: "20",
} as const;
// 배열이나 오브젝트 내에 있어도 변경 불가능하게 해줌.

type User2 = {
  readonly name: string;
  readonly age: number;
  readonly education: {
    readonly degree: string;
  };
  readonly skills: ReadonlyArray<string[]>;
}; // as const 효과

type Phone = "Samsung" | "Apple" | "LG";
type Notebook = "LG";

// type Sample = "Samsung" | "Apple"
type Sample = Exclude<Phone, Notebook>; //겹치는거 빼고 가져옴
// type Sample2 = "LG"
type Sample2 = Extract<Phone, Notebook>; //겹치는 것만 가져옴

type params = Parameters<typeof renderActiveShape>;
type ret = ReturnType<typeof renderActiveShape>;
