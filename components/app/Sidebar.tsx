"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import { Logo, Wordmark } from "@/components/ui/Logo";
import {
  HomeIcon,
  CalendarPlusIcon,
  BookIcon,
  UserIcon,
  ClockIcon,
  GearIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/Icons";

interface Profile {
  id: string;
  full_name: string;
  initials: string;
  email: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
}

export function Sidebar({ profile }: { profile: Profile }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const width = collapsed ? 64 : 248;

  const groups: { label: string; items: NavItem[] }[] = [
    {
      label: "Home",
      items: [
        { href: "/home", label: "Home", icon: HomeIcon },
        { href: "/schedule", label: "Schedule a mock", icon: CalendarPlusIcon },
      ],
    },
    {
      label: "Cases",
      items: [
        { href: "/cases", label: "Case library", icon: BookIcon },
        { href: `/profile/${profile.id}`, label: "My profile", icon: UserIcon },
      ],
    },
    {
      label: "Mock session",
      items: [{ href: "/mocks", label: "Upcoming mocks", icon: ClockIcon }],
    },
  ];

  return (
    <aside
      style={{ width, flex: `0 0 ${width}px` }}
      className="bg-white border-r border-(--color-border) flex flex-col transition-[width] duration-150 overflow-hidden"
    >
      {!collapsed ? (
        <div className="h-[62px] shrink-0 px-4 border-b border-(--color-border-soft) flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Logo size={26} />
            <Wordmark />
          </div>
          <button
            onClick={() => setCollapsed(true)}
            title="Collapse menu"
            className="border-none bg-[#f1f2ef] text-(--color-muted) rounded-md w-7 h-7 shrink-0 cursor-pointer flex items-center justify-center"
          >
            <ChevronLeftIcon />
          </button>
        </div>
      ) : (
        // Collapsed rail: logo centered in the header, expand button centered directly
        // below it -- on the same vertical axis as the nav icons.
        <div className="shrink-0 border-b border-(--color-border-soft)">
          <div className="h-[62px] flex items-center justify-center">
            <Logo size={26} />
          </div>
          <div className="flex justify-center pb-2.5">
            <button
              onClick={() => setCollapsed(false)}
              title="Expand menu"
              className="border-none bg-[#f1f2ef] text-(--color-muted) hover:text-(--color-fg) rounded-md w-10 h-8 cursor-pointer flex items-center justify-center"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-auto p-3 flex flex-col gap-3.5">
        {groups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) px-2.5 pb-1.5">
                {group.label}
              </div>
            )}
            <div className={collapsed ? "flex flex-col items-center gap-2" : "flex flex-col gap-1"}>
              {group.items.map((item) => (
                <SidebarLink key={item.href} item={item} active={pathname === item.href} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className={`px-3 pb-2 ${collapsed ? "flex justify-center" : ""}`}>
        <SidebarLink
          item={{ href: "/settings", label: "Settings", icon: GearIcon }}
          active={pathname === "/settings"}
          collapsed={collapsed}
        />
      </div>

      <div className={`p-3.5 border-t border-(--color-border-soft) flex items-center gap-2.5 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-[34px] h-[34px] shrink-0 rounded-full bg-[#e9f1ec] text-(--color-green) flex items-center justify-center font-semibold text-[13px]">
          {profile.initials}
        </div>
        {!collapsed && (
          <div className="leading-tight flex-1 min-w-0">
            <div className="text-[13px] font-semibold truncate">{profile.full_name}</div>
            <div className="text-[11px] text-(--color-muted) truncate">{profile.email}</div>
          </div>
        )}
        {!collapsed && (
          <form action={logout}>
            <button className="text-[12px] font-semibold text-(--color-muted) hover:text-(--color-fg) cursor-pointer whitespace-nowrap">
              Log out
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}

function SidebarLink({ item, active, collapsed }: { item: NavItem; active: boolean; collapsed: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      title={item.label}
      className={`rounded-lg text-sm font-medium flex items-center gap-2.5 ${
        collapsed ? "w-10 h-10 justify-center" : "px-2.5 py-2 w-full"
      } ${active ? "bg-[#e9f1ec] text-(--color-green)" : "text-(--color-fg) hover:bg-[#f1f2ef]"}`}
    >
      <span
        className="shrink-0 rounded-md flex items-center justify-center"
        style={
          collapsed
            ? undefined
            : {
                width: 26,
                height: 26,
                background: active ? "#2d6a4f" : "#f1f2ef",
                color: active ? "#fff" : "#8a8f8a",
              }
        }
      >
        <Icon size={collapsed ? 18 : 15} />
      </span>
      {!collapsed && item.label}
    </Link>
  );
}
