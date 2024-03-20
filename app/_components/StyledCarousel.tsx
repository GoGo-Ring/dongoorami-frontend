import Image from 'next/image';
import Link from 'next/link';

import { PerformanceInfoListItemApi } from '~/apis/scheme/performance';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/carousel';

interface StyledCarouselProps {
  performances: PerformanceInfoListItemApi[];
}

const StyledCarousel = ({ performances }: StyledCarouselProps) => {
  return (
    <Carousel className="flex w-full justify-center border py-8 sm:aspect-square">
      <CarouselContent className="flex">
        {performances.map((performance, index) => (
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
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default StyledCarousel;
