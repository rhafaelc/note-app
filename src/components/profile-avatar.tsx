import Image from "next/image";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

export async function ProfileAvatar(props: {
  image: string | null;
  name: string;
}) {
  return (
    <Avatar>
      {props.image && <Image src={props.image} alt={props.name} fill={true} />}
      {!props.image && (
        <AvatarFallback className="bg-primary/25">
          <div className="font-bold">{props.name?.charAt(0).toUpperCase()}</div>
        </AvatarFallback>
      )}
    </Avatar>
  );
}
