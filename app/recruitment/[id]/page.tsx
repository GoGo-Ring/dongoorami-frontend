import CommentSection from '~/app/recruitment/[id]/_components/commentSection';

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

const Page = ({ params }: Props) => {
  return (
    <div>
      <CommentSection accompanyPostId={params.id} />
    </div>
  );
};

export default Page;
