type StatProps = {
  label: string;
  value: string;
};

export function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase text-neutral-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-neutral-950">{value}</p>
    </div>
  );
}
