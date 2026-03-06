import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export type LinkProps = React.ComponentPropsWithoutRef<typeof RouterLink>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <RouterLink
        ref={ref}
        className={cn(
          "text-brand-base no-underline transition-[text-decoration] hover:underline",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-2 focus-visible:rounded-sm",
          className
        )}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = "Link";

export { Link };
