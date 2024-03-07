'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Icon from '~/components/icon';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '~/components/pagination';
import useMutationMessage from '~/hooks/mutations/useMutationMessage';
import useFetchMessage from '~/hooks/queries/useFetchMessage';
import { getDate } from '~/utils/dateFormatter';

import { calculatePage } from '../_utils/pagination';
import { MESSAGE_HEADER, MESSAGE_SIZE, getRead } from '../constatns';

const MainMessage = () => {
  const router = useRouter();
  const page = useSearchParams().get('page') || '1';

  const { data } = useFetchMessage(MESSAGE_SIZE, +page);
  const { mutate } = useMutationMessage();

  if (!data || !data.messages) {
    return null;
  }

  const handleClickMessage = (id: number) => {
    mutate(id);
    router.push(`/message/${id}`);
  };

  return (
    <>
      <table className="w-full text-center font-normal sm:hidden">
        <thead className="bg-gray-100 uppercase">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th
              scope="col"
              className="h-12 w-[150px] px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
            >
              {MESSAGE_HEADER.sender}
            </th>
            <th
              scope="col"
              className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
            >
              {MESSAGE_HEADER.content}
            </th>
            <th
              scope="col"
              className="h-12 w-[150px] px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
            >
              {MESSAGE_HEADER.date}
            </th>
            <th
              scope="col"
              className="h-12 w-[150px] px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
            >
              {MESSAGE_HEADER.isRead}
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.messages?.map(message => (
            <tr
              key={message.id}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              onClick={() => handleClickMessage(message.id)}
            >
              <td className="cursor-pointer p-4 align-middle font-medium [&:has([role=checkbox])]:pr-0">
                {message.senderId}
              </td>
              <td className="cursor-pointer p-4 align-middle font-medium [&:has([role=checkbox])]:pr-0">
                {message.content}
              </td>
              <td className="cursor-pointer p-4 align-middle font-medium [&:has([role=checkbox])]:pr-0">
                {getDate(new Date(message.date), 'yyyy.mm.dd')}
              </td>
              <td className="cursor-pointer p-4 align-middle font-medium [&:has([role=checkbox])]:pr-0">
                {getRead(message.isRead)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination className="mt-10 sm:hidden">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href={{
                query: {
                  page: calculatePage(+page - 1, data.allPage),
                },
              }}
            >
              <Icon
                iconName="chevron-down"
                size="small"
                className="rotate-90"
              />
            </PaginationLink>
          </PaginationItem>
          {Array.from({ length: data.allPage }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink href={{ query: { page: index + 1 } }}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink
              href={{
                query: {
                  page: calculatePage(+page + 1, data.allPage),
                },
              }}
            >
              <Icon
                iconName="chevron-down"
                size="small"
                className="-rotate-90"
              />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default MainMessage;
