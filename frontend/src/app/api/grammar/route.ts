import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const grammarPath = path.join(process.cwd(), '..', 'src', 'main', 'resources', 'grammar.json');
    const fileContent = fs.readFileSync(grammarPath, 'utf8');
    const grammar = JSON.parse(fileContent);
    return NextResponse.json(grammar);
  } catch (error) {
    console.error('Error reading grammar file:', error);
    return NextResponse.json({ error: 'Failed to read grammar file' }, { status: 500 });
  }
}
