"use client";

import Logout from "@/components/Logout";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function UserAvatar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    user && (
      <div className="flex items-center gap-2">
        <Link href={`/profile/${user.id}`}>
          <Avatar>
            <AvatarImage src={user.image ?? ""} />
          </Avatar>
        </Link>

        <Logout />
      </div>
    )
  );
}
