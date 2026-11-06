import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function base({ title, ...rest }: IconProps) {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": title ? undefined : true,
    role: title ? "img" : undefined,
    ...rest,
  };
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <svg {...base(props)}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base(props)}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base(props)}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconSun(props: IconProps) {
  return (
    <svg {...base(props)}>
      {props.title ? <title>{props.title}</title> : null}
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function IconMoon(props: IconProps) {
  return (
    <svg {...base(props)}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base(props)}>
      {props.title ? <title>{props.title}</title> : null}
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function IconGitHub(props: IconProps) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function IconLinkedIn(props: IconProps) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

export function IconApple(props: IconProps) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M16.37 12.7c-.02-2.33 1.9-3.45 1.99-3.5-1.08-1.58-2.77-1.8-3.37-1.83-1.43-.15-2.8.85-3.53.85-.73 0-1.85-.83-3.04-.81-1.56.02-3 .91-3.81 2.31-1.63 2.82-.42 7 1.17 9.29.78 1.12 1.7 2.38 2.91 2.33 1.17-.05 1.61-.76 3.02-.76 1.41 0 1.81.76 3.04.73 1.26-.02 2.05-1.14 2.82-2.26.89-1.3 1.25-2.56 1.27-2.62-.03-.01-2.44-.94-2.47-3.73ZM14.05 5.86c.64-.78 1.08-1.86.96-2.94-.93.04-2.05.62-2.72 1.4-.6.69-1.12 1.79-.98 2.85 1.04.08 2.1-.53 2.74-1.31Z" />
    </svg>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M4.5 3.2c0-.6.65-.97 1.17-.67l14.2 8.18a.78.78 0 0 1 0 1.35L5.67 20.24a.78.78 0 0 1-1.17-.67V3.2Zm2 1.7v13.46L15.5 12 6.5 4.9Z" />
    </svg>
  );
}

export function IconExternal(props: IconProps) {
  return (
    <svg {...base(props)}>
      {props.title ? <title>{props.title}</title> : null}
      <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}
