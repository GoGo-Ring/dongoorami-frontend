import Image from 'next/image';

interface CompanyProfileProps {
  name: string;
  image: string;
}

const Profile = ({ name, image }: CompanyProfileProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={image || 'https://picsum.photos/40'}
        alt="profile image"
        className="rounded-full"
        width={40}
        height={40}
      />
      <p className=" text-base font-medium">{name}</p>
    </div>
  );
};

export default Profile;
