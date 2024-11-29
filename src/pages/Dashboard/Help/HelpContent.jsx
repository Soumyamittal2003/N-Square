import { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const faqs = [
    {
      question: "How will this platform keep alumni information accurate and up-to-date?",
      answer:
        "The platform uses regular updates and verification processes, allowing users to edit their profiles and administrators to validate information.",
    },
    {
      question: "How does the platform foster meaningful alumni engagement?",
      answer:
        "Through networking tools, discussion forums, and event organization features, the platform encourages alumni to connect and collaborate.",
    },
    {
      question: "Can the platform help alumni and students find career opportunities or support professional development?",
      answer:
        "Yes, the platform provides job boards, mentorship programs, and resources for skill-building and career growth.",
    },
    {
      question: "How does the platform simplify managing events and reunions?",
      answer:
        "With integrated event management tools, users can create, promote, and manage events, including RSVP tracking and notifications.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Filter FAQs based on the search query
  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Get Help</h2>
      <p className="text-gray-600 mb-8">
        Get your questions answered quickly. Browse through our FAQs for instant support on common topics of inquiry.
      </p>
      
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search FAQs..."
          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
        />
      </div>

      <div className="space-y-3">
        {filteredFAQs.length === 0 ? (
          <div className="text-center text-gray-600">No results found</div>
        ) : (
          filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg bg-white shadow-md"
            >
              <button
                className="w-full text-left px-5 py-3 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-gray-800 font-medium text-base">
                  {faq.question}
                </span>
                <span className="text-gray-500 text-lg font-bold">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-5 py-3 text-gray-700 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQSection;
