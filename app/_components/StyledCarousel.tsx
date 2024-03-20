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
  datas: PerformanceInfoListItemApi[];
}

const StyledCarousel = ({ datas }: StyledCarouselProps) => {
  const images = datas.map(data => data.poster);

  return (
    <Carousel className="flex aspect-carousel w-[300] justify-center border py-8 sm:aspect-square">
      <CarouselContent className="flex">
        {/* {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="h-full w-full bg-primary">{index}번 공연 정보</div>
          </CarouselItem>
        ))} */}
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              width={224}
              height={288}
              className="h-full w-full "
              src={image}
              alt={`${image} 포스터`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default StyledCarousel;
