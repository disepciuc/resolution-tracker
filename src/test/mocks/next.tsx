import type { PropsWithChildren } from "react";
import type { LinkProps } from "next/link";

export function LinkMock({ href, children }: PropsWithChildren<LinkProps>) {
  return (
    <a href={typeof href === "string" ? href : href.toString()}>{children}</a>
  );
}
