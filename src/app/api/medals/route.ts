import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { MedalData } from '@/types';

export async function GET() {
  try {
    // Simulate potential server delay
    const delay = Math.random() * 500 + 200; // 200-700ms delay
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Simulate occasional server errors for testing error handling
    if (Math.random() > 0.95) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

    // Read medal data from JSON file
    const filePath = path.join(process.cwd(), 'public', 'medals.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const medalsData: MedalData[] = JSON.parse(fileContents);

    // Validate that the data is an array
    if (!Array.isArray(medalsData)) {
      throw new Error('Invalid data format: Expected an array of medal data');
    }

    return NextResponse.json(medalsData);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: `Failed to fetch medal data: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
} 