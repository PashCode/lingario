function DictionaryCardSkeleton() {
  return (
    <div className="rounded-main-blocks shadow-main-blocks flex min-h-0 w-full flex-col justify-around overflow-y-auto bg-white p-5 sm:justify-evenly lg:justify-around lg:px-10 lg:py-6 2xl:justify-evenly">
      <div className="xs:h-9 h-8 w-52 animate-pulse rounded bg-gray-100 sm:h-10 md:h-11 lg:h-9 2xl:h-11" />

      <div className="xs:gap-y-5 grid grid-rows-[repeat(4,1fr)] items-center gap-y-3 sm:gap-y-7 md:gap-y-8 lg:gap-y-5 2xl:gap-y-7">
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3"
          >
            <div className="xs:h-6 xs:w-6 h-5 w-5 animate-pulse rounded bg-gray-100 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-6 lg:w-6 2xl:h-7 2xl:w-7" />
            <div className="h-2 w-full animate-pulse rounded-full bg-gray-100 md:h-2.5" />
            <div className="xs:h-6 xs:w-12 h-5 w-10 animate-pulse rounded bg-gray-100 sm:h-7 sm:w-14 md:h-8 md:w-16 lg:h-6 lg:w-12 2xl:h-7 2xl:w-14" />
          </div>
        ))}
      </div>

      <div className="rounded-buttons xs:h-12 xs:w-48 h-11 w-45 animate-pulse self-center bg-gray-100 sm:h-14 sm:w-55 md:h-16 md:w-64 lg:h-12 lg:w-55 2xl:h-13 2xl:w-58" />
    </div>
  );
}

export default DictionaryCardSkeleton;
