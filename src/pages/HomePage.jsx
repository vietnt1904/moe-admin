import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useStories } from "../hooks/useStory";

const HomePage = () => {
  const displayDefault = 4;
  const seeMore = 4;
  const page = 1;
  const limit = 10;

    const [visibleProducts, setVisibleProducts] = useState(displayDefault); // Show 10 products initially

    const data = [
        { id: 1, title: "Product 1", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
        { id: 2, title: "Product 2", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
        { id: 3, title: "Product 3", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
        { id: 4, title: "Product 4", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
        { id: 5, title: "Product 5", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
        { id: 6, title: "Product 6", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
        { id: 7, title: "Product 7", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
        { id: 8, title: "Product 8", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
        { id: 9, title: "Product 9", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
        { id: 10, title: "Product 10", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
        { id: 11, title: "Product 11", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
      ];

      const [products] = useState(data);

  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const autoplayItem = useRef(Autoplay({ delay: 1500 }));
  const autoplayItem2 = useRef(Autoplay({ delay: 1500 }));
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const {data: storyData} = useStories(page, limit);
  const stories = storyData?.data || [];
  // const totalPages = storyData?.totalPages || 1;

  const handleToggle = (e) => {
    e.preventDefault(); // Prevent page reload
    if (visibleProducts < products.length) {
      setVisibleProducts(visibleProducts + seeMore); // Show all products (20 in this case)
    } else {
      setVisibleProducts(displayDefault); // Show only 10 products
    }
  };

  const dataForCarousel = [
    { id: 1, title: "Product 1", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
    { id: 2, title: "Product 2", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
    { id: 3, title: "Product 3", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
    { id: 4, title: "Product 4", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
    { id: 5, title: "Product 5", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
    { id: 6, title: "Product 6", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
    { id: 7, title: "Product 7", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
    { id: 8, title: "Product 8", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
    { id: 9, title: "Product 9", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
    { id: 10, title: "Product 10", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
    { id: 11, title: "Product 11", image: "https://upload-os-bbs.hoyolab.com/upload/2023/12/19/17138284/898721050c498b27389d23fa43f53fd8_5145071566460184172.jpeg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" },
  ];

  const [dataCarousel, setDataCarousel] = useState(dataForCarousel);
  console.log(stories);

  return (
    <div className="w-9/12 items-center mx-auto my-12">

      {/* đề cử */}
      <div>
        <div className="my-6 flex items-center">
            <p className="text-2xl font-bold">Đề cử</p>
            <img src="https://png.pngtree.com/png-vector/20221227/ourmid/pngtree-orange-cartoon-cute-flame-png-image_6510196.png" alt="trending" className="w-6 h-6 mx-2" />
        </div>
        <Carousel
        className="w-5/6 mx-auto"
          height={"auto"}
          slideSize={{ base: "50%", md: "33.333333%"}}
          slideGap={{ base: "md", sm: "md" }}
          plugins={[autoplayItem2.current]}
          onMouseEnter={autoplayItem2.current.play}
          onMouseLeave={autoplayItem2.current.reset}
          loop
          onClick={autoplayItem2.current.reset}
          align={"start"}
        >
          <Carousel.Slide>
            <img
                className="rounded-xl h-auto"
              src="https://cdn.openart.ai/stable_diffusion/6433c93336bd0fbfae112298d4428e33635aa789_2000x2000.webp"
              alt="ảnh slide"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
                className="rounded-xl"
              src="https://cdn.openart.ai/stable_diffusion/6433c93336bd0fbfae112298d4428e33635aa789_2000x2000.webp"
              alt="ảnh slide"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
                className="rounded-xl"
              src="https://cdn.openart.ai/stable_diffusion/6433c93336bd0fbfae112298d4428e33635aa789_2000x2000.webp"
              alt="ảnh slide"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
                className="rounded-xl"
              src="https://cdn.openart.ai/stable_diffusion/6433c93336bd0fbfae112298d4428e33635aa789_2000x2000.webp"
              alt="ảnh slide"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
                className="rounded-xl"
              src="https://cdn.openart.ai/stable_diffusion/6433c93336bd0fbfae112298d4428e33635aa789_2000x2000.webp"
              alt="ảnh slide"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
                className="rounded-xl"
              src="https://cdn.openart.ai/stable_diffusion/6433c93336bd0fbfae112298d4428e33635aa789_2000x2000.webp"
              alt="ảnh slide"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
                className="rounded-xl"
              src="https://cdn.openart.ai/stable_diffusion/6433c93336bd0fbfae112298d4428e33635aa789_2000x2000.webp"
              alt="ảnh slide"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
                className="rounded-xl"
              src="https://cdn.openart.ai/stable_diffusion/6433c93336bd0fbfae112298d4428e33635aa789_2000x2000.webp"
              alt="ảnh slide"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
                className="rounded-xl"
              src="https://cdn.openart.ai/stable_diffusion/6433c93336bd0fbfae112298d4428e33635aa789_2000x2000.webp"
              alt="ảnh slide"
            />
          </Carousel.Slide>
        </Carousel>
      </div>

      {/* hiển thị xem thêm */}
      <div>
      <div className="my-6 flex items-center">
            <p className="text-2xl font-bold">Hiển thị xem thêm</p>
            <img src="https://png.pngtree.com/png-vector/20221227/ourmid/pngtree-orange-cartoon-cute-flame-png-image_6510196.png" alt="trending" className="w-6 h-6 mx-2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {products.slice(0, visibleProducts).map((story) => (
          <div key={story?.id} className="rounded-lg overflow-hidden">
            {/* Link to story? detail page */}
            <Link to={`/story/${story?.id}`} onClick={() => window.scrollTo(0, 0)} className="flex-1">
              <img
                src={story?.image}
                alt={story?.title}
                className="w-full h-auto object-cover"
              />
            </Link>
          </div>
        ))}
        </div>
        <div className="flex justify-center mt-8">
            <Button size={isLargeScreen ? 'lg' : 'sm'} onClick={handleToggle} color="yellow">
              <p className="text-md lg:text-xl">{visibleProducts >= products.length ? "Ẩn bớt" : "Xem thêm"}</p>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
