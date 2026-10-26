"use client";

import type * as React from "react";

import { AppIcon } from "@/components/app-icon";
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { CURRENT_USER, NAV_ITEMS } from "@/lib/dashboard-data";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={item.id === "dashboard"}
                    tooltip={item.title}
                    render={(props) => (
                      <a
                        href={item.id === "dashboard" ? "/" : `#${item.id}`}
                        {...props}
                      />
                    )}
                  >
                    <AppIcon name={item.icon} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={CURRENT_USER.name}
              render={(props) => <a href="#profile" {...props} />}
            >
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {CURRENT_USER.initials}
                </AvatarFallback>
                <AvatarBadge className="bg-emerald-500" />
              </Avatar>
              <span className="grid flex-1 text-left leading-tight">
                <span className="truncate font-medium">
                  {CURRENT_USER.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {CURRENT_USER.role}
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="mx-0" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Support"
              render={(props) => <a href="#support" {...props} />}
            >
              <AppIcon name="support" />
              <span>Support</span>
              <AppIcon name="chevronRight" className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
