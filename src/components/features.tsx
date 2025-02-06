export default function Features() {
  const features = [
    {
      title: "Accurate Identification",
      description:
        "Advanced AI ensures accurate recognition of objects, scenes, and elements in any image.",
    },
    {
      title: "Real-time Analysis",
      description:
        "We provide real-time analysis of images, allowing you to monitor their contents in real-time.",
    },
    {
      title: "Comprehensive Insights",
      description:
        "Understand your image better with in-depth details on composition, colors, and key elements.",
    },
    {
      title: "Intuitive & Easy to Use",
      description:
        "A clean and simple interface designed for seamless image uploads and analysis.",
    },
  ];

  return (
    <div className={`max-w-6xl mx-auto space-y-8`}>
      <div className={`mx-auto text-center`}>
        <h2 className={`text-3xl font-bold`}>Features</h2>
      </div>

      {/* Features */}
      <ol className={`grid sm:grid-cols-2 gap-8`}>
        {features.map((step, i) => (
          <li key={i}>
            <div
              className={`dark:bg-black relative bg-white max-w-6xl mx-auto p-4 sm:p-6 rounded-xl drop-shadow-md hocus:drop-shadow-xl transition-all duration-500 dark:border text-pretty`}
            >
              {/* Title */}
              <h3 className={`text-xl font-bold`}>{step.title}</h3>

              {/* Description */}
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
