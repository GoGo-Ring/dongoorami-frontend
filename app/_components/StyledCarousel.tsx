import Image from 'next/image';

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
  const images = performances.map(performance => performance.poster);

  return (
    <Carousel className="flex w-full justify-center border py-8 sm:aspect-square">
      <CarouselContent className="flex">
        {images.map((image, index) => (
          <CarouselItem className=" flex justify-center " key={index}>
            <div className="flex w-[350px] justify-center border p-2">
              <Image
                width={500}
                height={288}
                className="h-full w-full "
                src={image}
                alt={`${image} 포스터`}
              />
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
