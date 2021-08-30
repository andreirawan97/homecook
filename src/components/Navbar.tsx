import "./Navbar.css";

export type NavPage = "recipes" | "savedRecipes";

type Props = {
  currentPage?: NavPage;
  onClickNav?: (selectedPage: NavPage) => void;
};

export default function Navbar(props: Props) {
  const { currentPage = "recipes", onClickNav } = props;

  const selectedPageStyle = "font-bold mr-6 cursor-pointer";
  const pageStyle = "mr-6 cursor-pointer";

  return (
    <nav className="navbar flex flex-row md:flex-col bg-primary p-4 pl-6 pr-6 m-1 rounded-xl shadow-sm">
      <span className="logo-title mr-12 mb-1">Homecook</span>

      <div>
        <span
          className={currentPage === "recipes" ? selectedPageStyle : pageStyle}
          onClick={() => onClickNav && onClickNav("recipes")}
        >
          Recipes
        </span>
        <span
          className={
            currentPage === "savedRecipes" ? selectedPageStyle : pageStyle
          }
          onClick={() => onClickNav && onClickNav("savedRecipes")}
        >
          Saved Recipes
        </span>
      </div>
    </nav>
  );
}
