import LogoutIcon from "@/assets/icons/logout.svg";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Logout() {
  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/signin");
        },
      },
    });
  }

  return (
    <Button className="cursor-pointer" size="icon" onClick={handleLogout}>
      <Image src={LogoutIcon} alt="Logout Icon" width={24} height={24} />
    </Button>
  );
}
