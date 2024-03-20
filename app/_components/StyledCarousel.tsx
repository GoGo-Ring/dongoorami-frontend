import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { PerformanceInfoListItemApi } from '~/apis/scheme/performance';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/carousel';
import Spinner from '~/components/spinner';

interface StyledCarouselProps {
  performances: PerformanceInfoListItemApi[] | null;
}

const StyledCarousel = ({ performances }: StyledCarouselProps) => {
  return (
    <Carousel className="flex w-full justify-center border py-8">
      {performances ? (
        <>
          <CarouselContent className="flex">
            {performances.map((performance, index) => (
              <Suspense key={index} fallback={<Spinner />}>
                <CarouselItem className=" flex justify-center " key={index}>
                  <div className="flex w-[350px] justify-center border p-2">
                    <Link href={`/performance/${performance.id}`}>
                      <Image
                        width={500}
                        height={288}
                        className="h-full w-full "
                        src={performance.poster}
                        alt={`${performance.name}} 포스터`}
                      />
                    </Link>
                  </div>
                </CarouselItem>
              </Suspense>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <CarouselContent className="flex h-[500px] w-full items-center justify-center">
            <Spinner />
          </CarouselContent>
        </div>
      )}
    </Carousel>
  );
};

export default StyledCarousel;
