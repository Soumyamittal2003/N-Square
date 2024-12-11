import BoardContent from "./BoardContent";
// import RightSidebar from "./RightSidebar";

const Board = () => {
  return (
    <div className="flex w-full bg-white">
      {/* Main Content Here */}
      <div className="w-[80%] p-2">
        <BoardContent />
      </div>
    </div>
  );
};

export default Board;
