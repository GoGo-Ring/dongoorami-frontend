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
    <Carousel className="flex w-full justify-center border py-8 sm:aspect-square">
      <CarouselContent className="flex">
        {/* {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="h-full w-full bg-primary">{index}번 공연 정보</div>
          </CarouselItem>
        ))} */}
        {images.map((image, index) => (
          <CarouselItem className=" flex justify-center " key={index}>
            <div className="bg-red flex w-[350px] justify-center border p-8">
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
