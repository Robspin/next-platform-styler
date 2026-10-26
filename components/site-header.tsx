import { AppIcon } from "@/components/app-icon";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CURRENT_USER, NOTIFICATIONS } from "@/lib/dashboard-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-(--header-height) w-full shrink-0 items-center gap-2 border-b bg-background px-3 md:px-4">
      <SidebarTrigger className="-ml-1" />
      <a href="/" className="flex items-center gap-2.5 rounded-md">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <AppIcon name="logo" className="size-4.5" />
        </span>
        <span className="font-heading text-base font-semibold tracking-tight">
          Recovery Platform
        </span>
      </a>
      <div className="ml-auto flex items-center gap-1">
        <ModeToggle />
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  );
}

function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`Meldingen (${NOTIFICATIONS.length} nieuw)`}
          />
        }
      >
        <AppIcon name="bell" />
        <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[0.625rem] tabular-nums">
          {NOTIFICATIONS.length}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Meldingen</DropdownMenuLabel>
          {NOTIFICATIONS.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex-col items-start gap-0.5"
            >
              <span className="font-medium">{notification.title}</span>
              <span className="text-xs text-muted-foreground">
                {notification.description}
              </span>
              <span className="text-xs text-muted-foreground">
                {notification.time}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-auto gap-1.5 px-1.5 py-1"
            aria-label="Gebruikersmenu"
          />
        }
      >
        <Avatar>
          <AvatarFallback>{CURRENT_USER.initials}</AvatarFallback>
        </Avatar>
        <AppIcon name="chevronDown" className="text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="block font-medium text-foreground">
              {CURRENT_USER.name}
            </span>
            <span className="block truncate font-normal">
              {CURRENT_USER.email}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <AppIcon name="user" />
            Profiel
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AppIcon name="administration" />
            Instellingen
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <AppIcon name="logout" />
          Uitloggen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
