export default function CardElement({ children, image }) {
  return (
    <>
      <div className="max-w-md flex flex-col md:flex-row md:grow-0 items-center border border-gray-100 text-sm sm:text-base my-8 cursor-pointer hover:shadow-md hover:shadow-slate-100">
        <img src={image} className="pt-6 pb-0 md:pt-0" width="200" />
        {children}
      </div>
    </>
  );
}
