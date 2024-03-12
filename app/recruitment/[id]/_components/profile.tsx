import { Avatar, AvatarFallback, AvatarImage } from '~/components/avatar';

interface CompanyProfileProps {
  name: string;
  image: string;
}

const Profile = ({ name, image }: CompanyProfileProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage
          src={image || 'https://picsum.photos/40'}
          alt={`${name} profile image`}
        />
        <AvatarFallback className="rounded-full" />
      </Avatar>
      <p className=" text-base font-medium">{name}</p>
    </div>
  );
};

export default Profile;
