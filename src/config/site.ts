export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Pet Care",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "News feed",
      href: "/news-feed",
    },
    {
      label: "About us",
      href: "/about-us",
    },
    {
      label: "Contact us",
      href: "/contact-us",
    },
    {
      label: "Login",
      href: "/login",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
  ],
};
