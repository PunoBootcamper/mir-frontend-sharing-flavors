interface ViewsProps {
  views: number;
}

const Views = ({ views }: ViewsProps) => {
  const viewsAsString: string = views === 0 ? "--" : views.toString();

  return (
    <div className="flex items-center">
      <svg
        className="w-6 h-6 ml-1 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 4.5C7.305 4.5 3.13 7.46 1.23 12c1.9 4.54 6.075 7.5 10.77 7.5 4.695 0 8.87-2.96 10.77-7.5-1.9-4.54-6.075-7.5-10.77-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      </svg>
      <span className="text-3xl font-bold text-white">{viewsAsString}</span>
    </div>
  );
};

export default Views;
