import { NextResponse } from "next/server";
import { z } from "zod";
import { matchProducts, describeMatches } from "@/lib/stylist";

const QuerySchema = z.object({
  occasion: z.string().optional(),
  mood: z.string().optional(),
  color: z.string().optional(),
  text: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = QuerySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const matches = matchProducts(parsed.data);
  const reply = describeMatches(parsed.data, matches);

  return NextResponse.json({ reply, products: matches });
}
