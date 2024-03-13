import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/carousel';

const StyledCarousel = () => {
  return (
    <Carousel className="flex aspect-carousel w-full justify-center border py-8 sm:aspect-square">
      <CarouselContent className="flex">
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="h-full w-full bg-primary">{index}번 공연 정보</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default StyledCarousel;
