"use client";

import { sidebarLinks } from "@/lib/utils/sidebarConfig/sidebarConfig";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function LeftSidebar() {
  const pathName = usePathname();

  return (
    <div className='border h-screen w-2/12'>
      <ul className='mt-10 pl-4'>
        {sidebarLinks.map((link, i) => {
          return (
            <li key={i} className='m-2'>
              <Link
                className={`${
                  pathName === link.path ? "text-[#0224FF]" : ""
                } font-medium`}
                href={link.path}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
