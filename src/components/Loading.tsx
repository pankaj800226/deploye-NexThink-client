import logo from '../assets/logo.png'
const Loading = () => {
  return (
    <div className="loading_wrapper">
      <img src={logo} alt="Logo Loading" />
      <div className="loader_bar">
        <div className="loader_fill"></div>
      </div>
    </div>
  );
};

export default Loading;
