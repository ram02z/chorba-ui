import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function LinkIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function UtensilsIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 2v7c0 1.66 1.34 3 3 3s3-1.34 3-3V2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 2v20" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

export const RestaurantIcon = UtensilsIcon;

export function ClockIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m5-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.76-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18m0 18c2.5-2.4 3.75-5.4 3.75-9S14.5 5.4 12 3m0 18c-2.5-2.4-3.75-5.4-3.75-9S9.5 5.4 12 3M3.6 9h16.8M3.6 15h16.8" />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m19 12-7 7-7-7" />
    </svg>
  );
}
