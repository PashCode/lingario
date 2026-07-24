function LoadingSkeleton() {
  return (
    <div className="rounded-main-blocks shadow-main-blocks flex min-h-0 w-full flex-col justify-center gap-y-4 overflow-y-auto bg-white p-5">
      <div className="flex flex-col gap-y-2">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
      </div>
      <div className="h-16 w-24 animate-pulse rounded bg-gray-100" />
      <div className="rounded-buttons h-11 w-45 animate-pulse self-center bg-gray-100" />
    </div>
  );
}

export default LoadingSkeleton;
