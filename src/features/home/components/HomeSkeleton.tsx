function HomeSkeleton() {
  return (
    <div className="rounded-main-blocks shadow-main-blocks flex h-[85%] max-h-170 min-h-0 w-full flex-col justify-evenly overflow-y-auto bg-white px-6 py-4 lg:px-30">
      <div className="flex items-center justify-center text-center lg:justify-between lg:text-left">
        <div className="flex flex-col items-center lg:items-start">
          <div className="rounded-main-blocks xs:h-7 h-6 w-40 animate-pulse bg-gray-100 md:h-8 lg:h-7 2xl:h-8" />
          <div className="xs:h-9 mt-8 h-8 w-64 animate-pulse rounded bg-gray-100 md:h-10 lg:h-9 2xl:h-10" />
          <div className="xs:h-18 mt-2 h-16 w-28 animate-pulse rounded bg-gray-100 md:h-20 lg:h-18 2xl:h-20" />
        </div>
      </div>

      <hr className="w-full text-gray-800 lg:my-3" />

      <div className="flex flex-col items-center justify-center gap-y-2">
        <div className="h-7 w-56 animate-pulse rounded bg-gray-100 md:h-8" />
        <div className="h-5 w-40 animate-pulse rounded bg-gray-100 md:h-6" />
        <div className="rounded-buttons xs:h-11 xs:w-48 mt-3 h-10 w-45 animate-pulse bg-gray-100 md:h-12 md:w-52 lg:h-11 lg:w-48 2xl:h-12 2xl:w-55" />
      </div>
    </div>
  );
}

export default HomeSkeleton;
