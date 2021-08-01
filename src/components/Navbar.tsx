import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar flex flex-row md:flex-col bg-primary p-4 pl-6 pr-6 m-1 rounded-xl shadow-sm">
      <span className="logo-title mr-12 mb-1">Homecook</span>

      <div>
        <span className="font-bold mr-6 cursor-pointer">Recipes</span>
        <span className="mr-6 cursor-pointer">Saved Recipes</span>
      </div>
    </nav>
  );
}
