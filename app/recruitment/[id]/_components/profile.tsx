import { Avatar, AvatarImage, AvatarFallback } from '~/components/avatar';

interface CompanyProfileProps {
  name: string;
  image: string;
}

const Profile = ({ name, image }: CompanyProfileProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <p className=" text-base font-medium">{name}</p>
    </div>
  );
};

export default Profile;
