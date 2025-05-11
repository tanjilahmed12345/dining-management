"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { currentUserAtom, loginAtom } from "@/store/authSlice";
import { deleteAdminCurrentRole } from "@/app/actions/admin.action";

export function AdminHeader() {

  const router = useRouter();
  // const pathname = usePathname();

  const [login, setLogin] = useAtom(loginAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);


  const userLogOutHandle = async () => {
    const res = await axios.post("/api/logout");
    console.log(res.data);
    setLogin(false);
    await deleteAdminCurrentRole(currentUser);
    router.push("/login");
  };
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Admin Dashboard</h1>
        <p className="text-gray-300">Manage dining system</p>
      </div>
      <Link href="/" className="mt-4 md:mt-0">
        <Button onClick={userLogOutHandle} className="bg-[#179295] hover:bg-[#0e7c7f] text-white border-none transition-colors">
          {/* <ArrowLeft className="h-4 w-4 mr-2" />  */}
          Log Out
        </Button>
      </Link>
    </div>
  )
}
