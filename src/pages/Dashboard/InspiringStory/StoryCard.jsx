// StoryCard.js

export default function StoryCard({ name, description }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-64">
      <div className="bg-gray-200 h-32 w-full rounded-t-lg"></div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex items-center mt-4">
          <button className="mr-2">👍</button>
          <button className="mr-2">👎</button>
          <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
