const FeatureItem = ({ feature }) => (
  <li className="flex items-center text-gray-600">
    <svg
      className="w-5 h-5 mr-2 text-green-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M5 13l4 4L19 7"></path>
    </svg>
    {feature}
  </li>
);

export default FeatureItem;