export default function HowItWorks() {
  const steps = [
    {
      title: "Select an Image",
      description: "Choose the image you'd like to explore and upload it here.",
    },
    {
      title: "AI Processing",
      description:
        "Let our advanced AI examine the image and extract insights.",
    },
    {
      title: "View Insights",
      description: "Receive comprehensive details about the image.",
    },
  ];

  return (
    <div className={`max-w-6xl mx-auto space-y-8`}>
      <div className={`mx-auto text-center`}>
        <h2 className={`text-3xl font-bold`}>How It Works</h2>
      </div>

      {/* Steps */}
      <ol className={`grid lg:grid-cols-3 gap-8`}>
        {steps.map((step, i) => (
          <li key={i}>
            <div
              data-before-content={`0${i + 1}`}
              className={`before-content before:text-4xl before:font-bold dark:bg-black relative bg-white max-w-6xl mx-auto p-4 sm:p-6 rounded-xl drop-shadow-md hocus:drop-shadow-xl transition-all duration-500 dark:border text-pretty`}
            >
              {/* Title */}
              <h3 className={`text-xl font-bold mt-4`}>{step.title}</h3>

              {/* Description */}
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
