import { NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    if (!keyword || keyword.trim() === '') {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    const cleanedKeyword = keyword.trim().toLowerCase();

    // Upsert: Create if it doesn't exist, increment count if it does
    const result = await (postgresPrisma as any).supportSearchAnalytics.upsert({
      where: {
        keyword: cleanedKeyword,
      },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        keyword: cleanedKeyword,
        count: 1,
      },
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Search analytics error:', error);
    return NextResponse.json({ error: 'Failed to update search analytics' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch top 7 trending keywords sorted by count
    const topSearches = await (postgresPrisma as any).supportSearchAnalytics.findMany({
      orderBy: {
        count: 'desc',
      },
      take: 7,
    });

    const tags = topSearches.map((s: any) => s.keyword);

    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Failed to fetch trending searches:', error);
    return NextResponse.json({ tags: [] }); // Fallback to empty array
  }
}
