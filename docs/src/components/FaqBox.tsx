import { JSX } from "react";

export function FaqBox(props: {
  open?: boolean,
  title: string,
  children: JSX.Element,
}) {
  return <details
    open={props.open}
    className="text-start last-of-type:mb-0 rounded-lg bg-neutral-50 dark:bg-neutral-800 p-2 mt-4 text-sm md:text-base"
  >
    <summary className="cursor-pointer px-2">
      <strong className="text-base md:text-lg"
      >
        {props.title}
      </strong>
    </summary>
    <div className="p-2">{props.children}</div>
  </details>;
}
