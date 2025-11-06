import { Resume } from "@/types/resume";

interface HeaderProps {
  basics: Resume["basics"];
}

export function Header({ basics }: HeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">{basics?.name}</h1>
      <p className="text-sm text-gray-700 mt-1">
        {basics?.email} | {basics?.phone} | {basics?.location?.city},{" "}
        {basics?.location?.region}
      </p>
      {basics?.summary && <p className="text-sm mt-3">{basics.summary}</p>}
    </header>
  );
}