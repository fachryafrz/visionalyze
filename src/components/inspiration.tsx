import Link from "next/link";

export default function Inspiration() {
  return (
    <div className="flex justify-center">
      <small className="text-center">
        Heavily inspired by{" "}
        <Link
          href={`https://snapalyzer.vercel.app`}
          target="_blank"
          className="text-[#5043e3]"
        >
          Snapalyzer
        </Link>
        , with additional features
      </small>
    </div>
  );
}
