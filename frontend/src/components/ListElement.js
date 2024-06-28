export default function ListElement({ children, image }) {
  return (
    <>
      <li className="flex flex-column items-center border border-gray-100 text-sm sm:text-base my-8 cursor-pointer hover:shadow-md hover:shadow-slate-100">
        <img src={image} width="200" />
        {children}
      </li>
    </>
  );
}
