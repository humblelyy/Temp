import { NextResponse } from "next/server";
import { wallpapers } from "@/lib/wallpapers";

export async function GET() {
  return NextResponse.json(wallpapers.filter((w) => w.published));
}
