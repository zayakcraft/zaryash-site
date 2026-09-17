import type { Metadata } from "next";
import { SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = { title: "Size Guide" };

const ROWS = [
  { size: "XS", chest: "—", waist: "—" },
  { size: "S", chest: "—", waist: "—" },
  { size: "M", chest: "—", waist: "—" },
  { size: "L", chest: "—", waist: "—" },
  { size: "XL", chest: "—", waist: "—" },
];

export default function SizeGuidePage() {
  return (
    <SimplePage eyebrow="CUSTOMER CARE" title="Size Guide">
      <p>Placeholder measurements — replace with real garment specs per category before launch.</p>
      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-z-line text-z-warm-gray">
            <th className="py-2 font-normal">Size</th>
            <th className="py-2 font-normal">Chest (in)</th>
            <th className="py-2 font-normal">Waist (in)</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.size} className="border-b border-z-line">
              <td className="py-2">{r.size}</td>
              <td className="py-2">{r.chest}</td>
              <td className="py-2">{r.waist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SimplePage>
  );
}
