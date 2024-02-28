import React from 'react';
import Link from "next/link";

function NavItem({ link, currentPath }) {
  return (
    <li className={`cursor-pointer py-2 NPC:py-0 hover:font-bold ${currentPath === link.href ? 'text-act' : ''}`}>
      <Link href={link.href}>
        <div className="transition-all whitespace-nowrap">{link.label}</div>
      </Link>
    </li>
  );
}

export default NavItem;