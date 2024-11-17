import { ReactNode } from "react";

export function Loading({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading: boolean;
}) {
  return isLoading ? <div>Loading...</div> : children;
}
