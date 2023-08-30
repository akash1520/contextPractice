import Link from "next/link";
import React from "react";

interface FooterListProps {
  title: string;
  links: FooterLink[];
}

type FooterLink = { title: string; link: string };

const FooterList = ({ title, links }: FooterListProps) => {
  return (
    <div>
      <h2 className="font-medium tracking-widest text-lg mb-4">{title}</h2>
      <nav className="list-none mb-10 flex flex-col gap-4 mt-6">
        {links.map(({ title, link }, index) => {
          return (
            <li key={index}>
              <Link href={link}>{title}</Link>
            </li>
          );
        })}
      </nav>
    </div>
  );
};

export default FooterList;
