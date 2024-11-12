const NavItem = ({ icon, label, expandable }) => {
  return (
    <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-100 rounded-lg px-2">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {expandable && <span className="text-gray-400 text-xs">+</span>}
    </div>
  );
};

export default NavItem;
