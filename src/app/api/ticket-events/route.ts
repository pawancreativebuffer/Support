import { NextRequest } from 'next/server';
import { ticketEventEmitter } from '@/lib/eventEmitter';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get('ticketId');
  const all = searchParams.get('all'); // true if agent/admin

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`));

      const onUpdate = (data: any) => {
        if (all === 'true' || (ticketId && data.ticketId === ticketId)) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        }
      };

      ticketEventEmitter.on('ticketUpdate', onUpdate);

      req.signal.addEventListener('abort', () => {
        ticketEventEmitter.off('ticketUpdate', onUpdate);
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
