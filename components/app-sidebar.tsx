import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { LuBuilding2 } from "react-icons/lu";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className=" p-4 flex items-center justify-between">
        <Image
          src="/login-estapar.png"
          alt="Logo Estapar"
          width={140}
          height={35}
          className="group-data-[state=collapsed]:hidden"
        />
        <SidebarTrigger className="ml-[250px] bg-gray-200 hover:bg-[#a5a5a5] cursor-pointer mt-3 rounded-4xl" />{" "}
      </SidebarHeader>
      <div className="bg-gray-200 h-[1px] w-[94%] mt-[-30px]" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href={"/dashboard"}>
                  <SidebarMenuButton className="cursor-pointer">
                    <div className="flex items-center gap-4 text-gray-500">
                      <LuBuilding2 size={20} />
                      <span className="text-xl ">Garagens</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
