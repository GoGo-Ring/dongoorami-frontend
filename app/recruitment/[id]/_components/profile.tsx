import { useRouter } from 'next/navigation';

import { Avatar, AvatarImage, AvatarFallback } from '~/components/avatar';

interface CompanyProfileProps {
  name: string;
  image: string;
  id?: number;
}

const Profile = ({ name, image, id }: CompanyProfileProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-2">
      <Avatar
        onClick={() => router.push(`/users/${id}`)}
        className=" cursor-pointer"
      >
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <p className=" text-base font-medium">{name}</p>
    </div>
  );
};

export default Profile;
