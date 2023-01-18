import PropTypes from "prop-types";
import Button from "./Button";


const Header = ({ title }) => {
  const onClick = () => {
    console.log("Click");
  };

  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color="white" text="Hello" onClick={onClick} />
    </header>
  );
};

Header.defaultProps = {
  title: "Pomo Focus Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
/* CSS in JS
const headingStyle = {
  color: "red",
  backgroundColor: "black",
};
*/
export default Header;
