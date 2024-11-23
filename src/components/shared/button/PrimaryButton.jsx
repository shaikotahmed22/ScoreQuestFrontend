const PrimaryButton = ({ text, func = null }) => {
  return (
    <div>
      <button
        onClick={func}
        className="bg-primary-brightOrange transition-all duration-150 text-natural-white rounded-[8px] px-[24px] py-[12px] font-bold hover:bg-[#e65c00] hover:[box-shadow:0px_5px_15px_rgba(255,_102,_0,_0.3)] "
      >
        {text}
      </button>
    </div>
  );
};

export default PrimaryButton;
