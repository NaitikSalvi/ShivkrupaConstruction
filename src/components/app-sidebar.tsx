"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Property",
    icon: Home,
    menu: {
      subItems: [
        { title: "Post Property", url: "/admin/adminProperties/postProperties" },
        { title: "Admin Property", url: "/admin/adminProperties" },
      ],
    },
    collapsibleCheck: true,
  },
  {
    title: "Users",
    url: "/admin/adminUsers",
    icon: Inbox,
    collapsibleCheck: false,
  },
  {
    title: "Enquiry",
    url: "/admin/adminEnquiry",
    icon: Inbox,
    collapsibleCheck: false,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
    collapsibleCheck: false,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    collapsibleCheck: false,
  },
];

export function AppSidebar() {
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
  const router = useRouter();

  const handleMenuClick = (title: string) => {
    // Toggle the collapsible menu only for the clicked item
    setOpenCollapsible((prev) => (prev === title ? null : title));
  };

  const handleNavigation = (url: string) => {
    router.push(url); // Navigate without page reload
    setOpenCollapsible(null); // Optionally close any open collapsibles
  };

  const logout = () => {
    document.cookie = "isAdmin=false; path=/;";
    router.push("/"); // Navigate to the home page after logout
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-black font-bold">
            Admin Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <div key={index}>
                  {/* Collapsible for "Property" */}
                  {item.collapsibleCheck ? (
                    <Collapsible
                      open={openCollapsible === item.title}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            onClick={() => handleMenuClick(item.title)}
                          >
                            <button className="flex items-center gap-2">
                              <item.icon />
                              <span>{item.title}</span>
                            </button>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.menu?.subItems.map((subItem, subIndex) => (
                              <SidebarMenuSubItem key={subIndex}>
                                <button
                                  onClick={() => handleNavigation(subItem.url)}
                                  className="text-left w-full"
                                >
                                  {subItem.title}
                                </button>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    /* Non-collapsible for other items */
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => handleNavigation(item.url!)}
                          className="flex items-center gap-2 w-full"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </div>
              ))}
            </SidebarMenu>

            <Button onClick={logout}>Logout</Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
