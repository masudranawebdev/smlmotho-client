import { Link } from "react-router-dom";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="bg-gray-100 p-4 mb-1">
      <ol className="list-reset flex text-gray-900">
        {paths.map((path, index) => (
          <li key={index}>
            {index < paths.length - 1 ? (
              <Link to={path.link} className="hover:text-blue-500">
                {path.label}
              </Link>
            ) : (
              <span className="text-gray-500">{path.label}</span>
            )}
            {index < paths.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
